from fastapi import FastAPI, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
import uuid
from starlette.middleware.cors import CORSMiddleware


class EventCreate(BaseModel):
    name: str
    description: str
    date: str
    time: str
    location: str
    category: str
    organizer: str
    price: Optional[str] = None
    image: Optional[str] = None
    capacity: Optional[str] = None
    age_restriction: Optional[str] = None
    ticket_url: Optional[str] = None

# Import sample events used for the database population
from sample_data import sample_events

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

# In-memory events store
_events = []
for e in sample_events:
    event = e.copy()
    # Ensure each event has required metadata
    event.setdefault("id", str(uuid.uuid4()))
    now = datetime.utcnow().isoformat()
    event.setdefault("created_at", now)
    event.setdefault("updated_at", now)
    _events.append(event)

def _filter_events(category: Optional[str], location: Optional[str], search: Optional[str], limit: int) -> List[dict]:
    results = _events
    if category:
        results = [e for e in results if category.lower() in e.get("category", "").lower()]
    if location:
        results = [e for e in results if location.lower() in e.get("location", "").lower()]
    if search:
        s = search.lower()
        results = [e for e in results if s in e.get("name", "").lower() or s in e.get("description", "").lower() or s in e.get("location", "").lower()]
    return results[:limit]

@app.get("/api/events")
def get_events(category: Optional[str] = Query(None), location: Optional[str] = Query(None), search: Optional[str] = Query(None), limit: int = Query(100)):
    return _filter_events(category, location, search, limit)

@app.get("/api/events/{event_id}")
def get_event(event_id: str):
    for event in _events:
        if event["id"] == event_id:
            return event
    raise HTTPException(status_code=404, detail="Event not found")

@app.post("/api/events")
def create_event(event: EventCreate):
    event_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat()
    new_event = {**event.dict(), "id": event_id, "created_at": now, "updated_at": now}
    _events.append(new_event)
    return new_event

@app.put("/api/events/{event_id}")
def update_event(event_id: str, update: dict):
    for i, evt in enumerate(_events):
        if evt["id"] == event_id:
            updated = {**evt, **update, "updated_at": datetime.utcnow().isoformat(), "id": event_id}
            _events[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Event not found")

@app.delete("/api/events/{event_id}")
def delete_event(event_id: str):
    for i, evt in enumerate(_events):
        if evt["id"] == event_id:
            _events.pop(i)
            return {"message": "Event deleted"}
    raise HTTPException(status_code=404, detail="Event not found")

@app.get("/api/events/category/{category}")
def get_events_by_category(category: str):
    return _filter_events(category=category, location=None, search=None, limit=100)

@app.get("/api/categories")
def get_categories():
    return {"categories": sorted({e["category"] for e in _events})}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


