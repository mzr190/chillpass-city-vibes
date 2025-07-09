from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Event Models
class Event(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    date: str
    time: str
    location: str
    price: Optional[str] = None
    category: str
    image: Optional[str] = None
    capacity: Optional[str] = None
    age_restriction: Optional[str] = None
    organizer: str
    ticket_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class EventCreate(BaseModel):
    name: str
    description: str
    date: str
    time: str
    location: str
    price: Optional[str] = None
    category: str
    image: Optional[str] = None
    capacity: Optional[str] = None
    age_restriction: Optional[str] = None
    organizer: str
    ticket_url: Optional[str] = None

class EventUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    location: Optional[str] = None
    price: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None
    capacity: Optional[str] = None
    age_restriction: Optional[str] = None
    organizer: Optional[str] = None
    ticket_url: Optional[str] = None

class EventFilter(BaseModel):
    category: Optional[str] = None
    location: Optional[str] = None
    date: Optional[str] = None
    price_range: Optional[str] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Event endpoints
@api_router.get("/events", response_model=List[Event])
async def get_events(
    category: Optional[str] = Query(None, description="Filter by category"),
    location: Optional[str] = Query(None, description="Filter by location"),
    search: Optional[str] = Query(None, description="Search events by name or description"),
    limit: int = Query(100, description="Maximum number of events to return")
):
    """Get all events with optional filtering"""
    query = {}
    
    if category:
        query["category"] = {"$regex": category, "$options": "i"}
    
    if location:
        query["location"] = {"$regex": location, "$options": "i"}
    
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"location": {"$regex": search, "$options": "i"}}
        ]
    
    events = await db.events.find(query).limit(limit).to_list(limit)
    return [Event(**event) for event in events]

@api_router.get("/events/{event_id}", response_model=Event)
async def get_event(event_id: str):
    """Get a specific event by ID"""
    event = await db.events.find_one({"id": event_id})
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return Event(**event)

@api_router.post("/events", response_model=Event)
async def create_event(event: EventCreate):
    """Create a new event"""
    event_dict = event.dict()
    event_obj = Event(**event_dict)
    await db.events.insert_one(event_obj.dict())
    return event_obj

@api_router.put("/events/{event_id}", response_model=Event)
async def update_event(event_id: str, event_update: EventUpdate):
    """Update an existing event"""
    event = await db.events.find_one({"id": event_id})
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    
    update_data = event_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    await db.events.update_one({"id": event_id}, {"$set": update_data})
    
    updated_event = await db.events.find_one({"id": event_id})
    return Event(**updated_event)

@api_router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    """Delete an event"""
    result = await db.events.delete_one({"id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted successfully"}

@api_router.get("/events/category/{category}", response_model=List[Event])
async def get_events_by_category(category: str):
    """Get events filtered by category"""
    events = await db.events.find({"category": {"$regex": category, "$options": "i"}}).to_list(100)
    return [Event(**event) for event in events]

@api_router.get("/categories")
async def get_categories():
    """Get all available event categories"""
    categories = await db.events.distinct("category")
    return {"categories": categories}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
