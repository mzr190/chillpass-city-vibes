"""
Script to populate the database with initial events data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Sample events data based on current frontend data
sample_events = [
    {
        "id": "1",
        "name": "Jazz en el Bellavista",
        "description": "Una noche íntima de jazz en el corazón de Bellavista con los mejores músicos locales. Disfruta de cócteles premium y un ambiente único.",
        "date": "2024-03-15",
        "time": "20:00",
        "location": "Barrio Bellavista",
        "price": "$15.000",
        "category": "Música",
        "image": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "capacity": "80 personas",
        "age_restriction": "18+",
        "organizer": "Bellavista Jazz Club",
        "ticket_url": "https://puntoticket.com/jazz-bellavista"
    },
    {
        "id": "2",
        "name": "Cena Degustación",
        "description": "Experiencia gastronómica única con menú degustación de 7 tiempos preparado por chef reconocido internacionalmente.",
        "date": "2024-03-16",
        "time": "19:30",
        "location": "Las Condes",
        "price": "$45.000",
        "category": "Gastronomía",
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "capacity": "40 personas",
        "age_restriction": "Sin restricción",
        "organizer": "Restaurante Gourmet",
        "ticket_url": "https://puntoticket.com/cena-degustacion"
    },
    {
        "id": "3",
        "name": "Arte Contemporáneo",
        "description": "Exposición de arte contemporáneo chileno con obras de artistas emergentes y reconocidos del país.",
        "date": "2024-03-17",
        "time": "18:00",
        "location": "Centro Cultural",
        "price": "Gratuito",
        "category": "Cultura",
        "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "capacity": "200 personas",
        "age_restriction": "Sin restricción",
        "organizer": "Centro Cultural Metropolitano",
        "ticket_url": None
    },
    {
        "id": "4",
        "name": "Fiesta Rooftop",
        "description": "Fiesta exclusiva en rooftop con vista panorámica de Santiago. DJs internacionales y barra libre premium.",
        "date": "2024-03-18",
        "time": "22:00",
        "location": "Providencia",
        "price": "$25.000",
        "category": "Fiesta",
        "image": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "capacity": "300 personas",
        "age_restriction": "21+",
        "organizer": "Rooftop Events",
        "ticket_url": "https://puntoticket.com/fiesta-rooftop"
    },
    {
        "id": "5",
        "name": "Mercado Gastronómico",
        "description": "Mercado gastronómico con los mejores food trucks y productores locales. Degusta sabores únicos de Chile.",
        "date": "2024-03-19",
        "time": "12:00",
        "location": "Ñuñoa",
        "price": "$10.000",
        "category": "Gastronomía",
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "capacity": "500 personas",
        "age_restriction": "Sin restricción",
        "organizer": "Mercado Local",
        "ticket_url": "https://puntoticket.com/mercado-gastronomico"
    },
    {
        "id": "6",
        "name": "Actividades Parque Bicentenario",
        "description": "Jornada familiar con actividades al aire libre: yoga, deportes, picnic y entretenimiento para toda la familia.",
        "date": "2024-03-20",
        "time": "10:00",
        "location": "Vitacura",
        "price": "Gratuito",
        "category": "Aire libre",
        "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "capacity": "Sin límite",
        "age_restriction": "Sin restricción",
        "organizer": "Municipalidad de Vitacura",
        "ticket_url": None
    },
    {
        "id": "7",
        "name": "Concierto Indie",
        "description": "Concierto de música indie con bandas emergentes chilenas y una headliner internacional sorpresa.",
        "date": "2024-03-21",
        "time": "21:00",
        "location": "Teatro Cariola",
        "price": "$18.000",
        "category": "Música",
        "image": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "capacity": "1,200 personas",
        "age_restriction": "16+",
        "organizer": "Indie Productions",
        "ticket_url": "https://puntoticket.com/concierto-indie"
    },
    {
        "id": "8",
        "name": "Food Truck Festival",
        "description": "Festival de food trucks con más de 30 opciones gastronómicas, música en vivo y actividades familiares.",
        "date": "2024-03-22",
        "time": "14:00",
        "location": "Parque Araucano",
        "price": "$8.000",
        "category": "Gastronomía",
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "capacity": "2,000 personas",
        "age_restriction": "Sin restricción",
        "organizer": "Food Truck Chile",
        "ticket_url": "https://puntoticket.com/food-truck-festival"
    },
    {
        "id": "9",
        "name": "Concierto de rock alternativo",
        "description": "Una noche épica de rock alternativo con las mejores bandas locales e internacionales. Prepárate para vivir una experiencia única llena de energía y buena música.",
        "date": "2024-03-23",
        "time": "21:00",
        "location": "Teatro Caupolicán",
        "price": "$20.000 - $35.000",
        "category": "Música",
        "image": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "capacity": "2,500 personas",
        "age_restriction": "18+",
        "organizer": "Rock & Roll Productions",
        "ticket_url": "https://puntoticket.com/rock-alternativo"
    },
    {
        "id": "10",
        "name": "Festival gastronómico",
        "description": "Festival gastronómico con los mejores chefs de Santiago presentando sus creaciones más innovadoras.",
        "date": "2024-03-24",
        "time": "12:00",
        "location": "Parque Araucano",
        "price": "$15.000",
        "category": "Gastronomía",
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "capacity": "1,500 personas",
        "age_restriction": "Sin restricción",
        "organizer": "Gastronomy Santiago",
        "ticket_url": "https://puntoticket.com/festival-gastronomico"
    }
]

async def populate_events():
    """Populate the database with sample events"""
    try:
        # Clear existing events
        await db.events.delete_many({})
        print("Cleared existing events")
        
        # Insert sample events
        result = await db.events.insert_many(sample_events)
        print(f"Inserted {len(result.inserted_ids)} events")
        
        # Display categories
        categories = await db.events.distinct("category")
        print(f"Available categories: {categories}")
        
        print("Database populated successfully!")
        
    except Exception as e:
        print(f"Error populating database: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(populate_events())