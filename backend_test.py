import requests
import json
import os
import sys
from dotenv import load_dotenv
from pathlib import Path
import uuid

# Load environment variables from frontend/.env
# Use a path relative to this script so it works in different environments
env_path = Path(__file__).resolve().parent / 'frontend' / '.env'
load_dotenv(env_path)

# Get the backend URL from environment variables
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    print("Error: REACT_APP_BACKEND_URL not found in environment variables")
    sys.exit(1)

# Ensure the URL ends with /api
if not BACKEND_URL.endswith('/api'):
    API_URL = f"{BACKEND_URL}/api"
else:
    API_URL = BACKEND_URL

print(f"Using API URL: {API_URL}")

def test_get_all_events():
    """Test GET /api/events endpoint"""
    print("\n=== Testing GET /api/events ===")
    response = requests.get(f"{API_URL}/events")
    
    if response.status_code == 200:
        events = response.json()
        print(f"Success! Status code: {response.status_code}")
        print(f"Found {len(events)} events")
        
        if events:
            # Print the first event as a sample
            print("\nSample event:")
            print(json.dumps(events[0], indent=2))
            
            # Verify event fields
            required_fields = ['id', 'name', 'description', 'date', 'time', 'location', 'category', 'organizer']
            missing_fields = [field for field in required_fields if field not in events[0]]
            
            if missing_fields:
                print(f"Warning: Missing required fields in event: {missing_fields}")
            else:
                print("All required fields present in events")
        
        return True, events
    else:
        print(f"Failed! Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_get_event_by_id(event_id="1"):
    """Test GET /api/events/{event_id} endpoint"""
    print(f"\n=== Testing GET /api/events/{event_id} ===")
    response = requests.get(f"{API_URL}/events/{event_id}")
    
    if response.status_code == 200:
        event = response.json()
        print(f"Success! Status code: {response.status_code}")
        print(f"Event details:")
        print(json.dumps(event, indent=2))
        
        # Verify event fields
        required_fields = ['id', 'name', 'description', 'date', 'time', 'location', 'category', 'organizer']
        missing_fields = [field for field in required_fields if field not in event]
        
        if missing_fields:
            print(f"Warning: Missing required fields in event: {missing_fields}")
            return False, event
        else:
            print("All required fields present in event")
            return True, event
    else:
        print(f"Failed! Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_get_event_by_invalid_id(event_id="999"):
    """Test GET /api/events/{event_id} with invalid ID (should return 404)"""
    print(f"\n=== Testing GET /api/events/{event_id} (Invalid ID) ===")
    response = requests.get(f"{API_URL}/events/{event_id}")
    
    if response.status_code == 404:
        print(f"Success! Received expected 404 status code for invalid event ID")
        print(f"Response: {response.text}")
        return True, None
    else:
        print(f"Failed! Expected status code 404, but got {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_get_events_by_category(category="Música"):
    """Test GET /api/events/category/{category} endpoint"""
    print(f"\n=== Testing GET /api/events/category/{category} ===")
    response = requests.get(f"{API_URL}/events/category/{category}")
    
    if response.status_code == 200:
        events = response.json()
        print(f"Success! Status code: {response.status_code}")
        print(f"Found {len(events)} events in category '{category}'")
        
        if events:
            # Print the first event as a sample
            print("\nSample event:")
            print(json.dumps(events[0], indent=2))
            
            # Verify all events have the correct category
            incorrect_category = [event for event in events if event['category'].lower() != category.lower()]
            
            if incorrect_category:
                print(f"Warning: Found {len(incorrect_category)} events with incorrect category")
                return False, events
            else:
                print(f"All events have the correct category: {category}")
                return True, events
        else:
            print(f"No events found in category '{category}'")
            return True, events
    else:
        print(f"Failed! Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_get_categories():
    """Test GET /api/categories endpoint"""
    print("\n=== Testing GET /api/categories ===")
    response = requests.get(f"{API_URL}/categories")
    
    if response.status_code == 200:
        data = response.json()
        categories = data.get('categories', [])
        print(f"Success! Status code: {response.status_code}")
        print(f"Found {len(categories)} categories")
        print(f"Categories: {categories}")
        return True, categories
    else:
        print(f"Failed! Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_search_events_by_category(category="Música"):
    """Test GET /api/events?category={category} endpoint"""
    print(f"\n=== Testing GET /api/events?category={category} ===")
    response = requests.get(f"{API_URL}/events", params={"category": category})
    
    if response.status_code == 200:
        events = response.json()
        print(f"Success! Status code: {response.status_code}")
        print(f"Found {len(events)} events matching category '{category}'")
        
        if events:
            # Print the first event as a sample
            print("\nSample event:")
            print(json.dumps(events[0], indent=2))
            return True, events
        else:
            print(f"No events found matching category '{category}'")
            return True, events
    else:
        print(f"Failed! Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_search_events_by_location(location="Bellavista"):
    """Test GET /api/events?location={location} endpoint"""
    print(f"\n=== Testing GET /api/events?location={location} ===")
    response = requests.get(f"{API_URL}/events", params={"location": location})
    
    if response.status_code == 200:
        events = response.json()
        print(f"Success! Status code: {response.status_code}")
        print(f"Found {len(events)} events matching location '{location}'")
        
        if events:
            # Print the first event as a sample
            print("\nSample event:")
            print(json.dumps(events[0], indent=2))
            
            # Verify all events have the location in their location field
            incorrect_location = [event for event in events if location.lower() not in event['location'].lower()]
            
            if incorrect_location:
                print(f"Warning: Found {len(incorrect_location)} events without the specified location")
                return False, events
            else:
                print(f"All events contain the location: {location}")
                return True, events
        else:
            print(f"No events found matching location '{location}'")
            return True, events
    else:
        print(f"Failed! Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_search_events_by_keyword(search="jazz"):
    """Test GET /api/events?search={search} endpoint"""
    print(f"\n=== Testing GET /api/events?search={search} ===")
    response = requests.get(f"{API_URL}/events", params={"search": search})
    
    if response.status_code == 200:
        events = response.json()
        print(f"Success! Status code: {response.status_code}")
        print(f"Found {len(events)} events matching search term '{search}'")
        
        if events:
            # Print the first event as a sample
            print("\nSample event:")
            print(json.dumps(events[0], indent=2))
            return True, events
        else:
            print(f"No events found matching search term '{search}'")
            return True, events
    else:
        print(f"Failed! Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_combined_search_and_filter(search="concierto", category="Música"):
    """Test GET /api/events?search={search}&category={category} endpoint"""
    print(f"\n=== Testing GET /api/events?search={search}&category={category} ===")
    response = requests.get(f"{API_URL}/events", params={"search": search, "category": category})
    
    if response.status_code == 200:
        events = response.json()
        print(f"Success! Status code: {response.status_code}")
        print(f"Found {len(events)} events matching search term '{search}' and category '{category}'")
        
        if events:
            # Print the first event as a sample
            print("\nSample event:")
            print(json.dumps(events[0], indent=2))
            
            # Verify all events have the correct category
            incorrect_category = [event for event in events if event['category'].lower() != category.lower()]
            
            if incorrect_category:
                print(f"Warning: Found {len(incorrect_category)} events with incorrect category")
                return False, events
            else:
                print(f"All events have the correct category: {category}")
                return True, events
        else:
            print(f"No events found matching search term '{search}' and category '{category}'")
            return True, events
    else:
        print(f"Failed! Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_limit_results(limit=5):
    """Test GET /api/events?limit={limit} endpoint"""
    print(f"\n=== Testing GET /api/events?limit={limit} ===")
    response = requests.get(f"{API_URL}/events", params={"limit": limit})
    
    if response.status_code == 200:
        events = response.json()
        print(f"Success! Status code: {response.status_code}")
        print(f"Found {len(events)} events with limit {limit}")
        
        if len(events) <= limit:
            print(f"Correct number of events returned (less than or equal to {limit})")
            if events:
                # Print the first event as a sample
                print("\nSample event:")
                print(json.dumps(events[0], indent=2))
            return True, events
        else:
            print(f"Warning: More than {limit} events returned ({len(events)})")
            return False, events
    else:
        print(f"Failed! Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_create_event():
    """Test POST /api/events endpoint"""
    print("\n=== Testing POST /api/events ===")
    
    # Create a new event with valid data
    new_event = {
        "name": "Test Event " + str(uuid.uuid4())[:8],
        "description": "This is a test event created by the API test script",
        "date": "2025-06-15",
        "time": "19:00",
        "location": "Test Venue, Santiago",
        "price": "5000 CLP",
        "category": "Cultura",
        "image": "https://example.com/test-image.jpg",
        "capacity": "100",
        "age_restriction": "18+",
        "organizer": "Test Organizer",
        "ticket_url": "https://example.com/tickets"
    }
    
    response = requests.post(f"{API_URL}/events", json=new_event)
    
    if response.status_code == 200:
        created_event = response.json()
        print(f"Success! Status code: {response.status_code}")
        print(f"Created event:")
        print(json.dumps(created_event, indent=2))
        
        # Verify the created event has all the fields we sent
        for key, value in new_event.items():
            if created_event.get(key) != value:
                print(f"Warning: Field '{key}' has unexpected value. Expected: '{value}', Got: '{created_event.get(key)}'")
        
        print(f"Event created with ID: {created_event.get('id')}")
        return True, created_event
    else:
        print(f"Failed! Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_update_event(event_id=None):
    """Test PUT /api/events/{event_id} endpoint"""
    if not event_id:
        # Create a new event to update
        success, event = test_create_event()
        if not success:
            print("Failed to create event for update test")
            return False, None
        event_id = event.get('id')
    
    print(f"\n=== Testing PUT /api/events/{event_id} ===")
    
    # Update data
    update_data = {
        "name": "Updated Test Event",
        "description": "This event has been updated by the API test script",
        "price": "7500 CLP"
    }
    
    response = requests.put(f"{API_URL}/events/{event_id}", json=update_data)
    
    if response.status_code == 200:
        updated_event = response.json()
        print(f"Success! Status code: {response.status_code}")
        print(f"Updated event:")
        print(json.dumps(updated_event, indent=2))
        
        # Verify the updated event has the new values
        for key, value in update_data.items():
            if updated_event.get(key) != value:
                print(f"Warning: Field '{key}' was not updated correctly. Expected: '{value}', Got: '{updated_event.get(key)}'")
                return False, updated_event
        
        print("Event updated successfully")
        return True, updated_event
    else:
        print(f"Failed! Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_delete_event(event_id=None):
    """Test DELETE /api/events/{event_id} endpoint"""
    if not event_id:
        # Create a new event to delete
        success, event = test_create_event()
        if not success:
            print("Failed to create event for delete test")
            return False, None
        event_id = event.get('id')
    
    print(f"\n=== Testing DELETE /api/events/{event_id} ===")
    
    response = requests.delete(f"{API_URL}/events/{event_id}")
    
    if response.status_code == 200:
        print(f"Success! Status code: {response.status_code}")
        print(f"Response: {response.text}")
        
        # Verify the event was deleted by trying to get it
        verify_response = requests.get(f"{API_URL}/events/{event_id}")
        if verify_response.status_code == 404:
            print(f"Verified: Event with ID {event_id} was deleted successfully")
            return True, None
        else:
            print(f"Warning: Event with ID {event_id} still exists after deletion")
            return False, None
    else:
        print(f"Failed! Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_malformed_request():
    """Test error handling with malformed request"""
    print("\n=== Testing error handling with malformed request ===")
    
    # Test with invalid JSON
    invalid_json = "This is not valid JSON"
    headers = {"Content-Type": "application/json"}
    
    response = requests.post(f"{API_URL}/events", data=invalid_json, headers=headers)
    
    if response.status_code >= 400:
        print(f"Success! Server correctly rejected malformed request with status code: {response.status_code}")
        print(f"Response: {response.text}")
        return True, None
    else:
        print(f"Failed! Server accepted malformed request with status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def test_missing_required_fields():
    """Test error handling with missing required fields"""
    print("\n=== Testing error handling with missing required fields ===")
    
    # Create an event with missing required fields
    incomplete_event = {
        "name": "Incomplete Event"
        # Missing required fields like description, date, time, etc.
    }
    
    response = requests.post(f"{API_URL}/events", json=incomplete_event)
    
    if response.status_code >= 400:
        print(f"Success! Server correctly rejected incomplete data with status code: {response.status_code}")
        print(f"Response: {response.text}")
        return True, None
    else:
        print(f"Failed! Server accepted incomplete data with status code: {response.status_code}")
        print(f"Response: {response.text}")
        return False, None

def run_all_tests():
    """Run all API tests"""
    print("Starting API tests...")
    
    # Dictionary to store test results
    results = {}
    
    # Core API Endpoints
    print("\n=== TESTING CORE API ENDPOINTS ===")
    
    # Test 1: Get all events
    success, events = test_get_all_events()
    results["GET /api/events"] = "✅ Passed" if success else "❌ Failed"
    
    # If we have events, use the first one's ID for the next test
    event_id = events[0]['id'] if success and events else "1"
    
    # Test 2: Get event by ID
    success, _ = test_get_event_by_id(event_id)
    results[f"GET /api/events/{event_id}"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 3: Get event by invalid ID (should return 404)
    success, _ = test_get_event_by_invalid_id("999")
    results["GET /api/events/999 (Invalid ID)"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 4: Get events by category
    success, _ = test_get_events_by_category("Música")
    results["GET /api/events/category/Música"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 5: Get all categories
    success, _ = test_get_categories()
    results["GET /api/categories"] = "✅ Passed" if success else "❌ Failed"
    
    # Search and Filtering
    print("\n=== TESTING SEARCH AND FILTERING ===")
    
    # Test 6: Search events by keyword
    success, _ = test_search_events_by_keyword("jazz")
    results["GET /api/events?search=jazz"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 7: Filter events by category
    success, _ = test_search_events_by_category("Música")
    results["GET /api/events?category=Música"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 8: Filter events by location
    success, _ = test_search_events_by_location("Bellavista")
    results["GET /api/events?location=Bellavista"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 9: Combined search and filter
    success, _ = test_combined_search_and_filter("concierto", "Música")
    results["GET /api/events?search=concierto&category=Música"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 10: Limit results
    success, _ = test_limit_results(5)
    results["GET /api/events?limit=5"] = "✅ Passed" if success else "❌ Failed"
    
    # CRUD Operations
    print("\n=== TESTING CRUD OPERATIONS ===")
    
    # Test 11: Create a new event
    success, created_event = test_create_event()
    results["POST /api/events"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 12: Update an existing event
    if success and created_event:
        success, _ = test_update_event(created_event.get('id'))
        results[f"PUT /api/events/{created_event.get('id')}"] = "✅ Passed" if success else "❌ Failed"
    else:
        results["PUT /api/events/{event_id}"] = "⚠️ Skipped (Create event failed)"
    
    # Test 13: Delete an event
    if success and created_event:
        success, _ = test_delete_event(created_event.get('id'))
        results[f"DELETE /api/events/{created_event.get('id')}"] = "✅ Passed" if success else "❌ Failed"
    else:
        # Create a new event specifically for delete test
        success, delete_event = test_create_event()
        if success and delete_event:
            success, _ = test_delete_event(delete_event.get('id'))
            results[f"DELETE /api/events/{delete_event.get('id')}"] = "✅ Passed" if success else "❌ Failed"
        else:
            results["DELETE /api/events/{event_id}"] = "⚠️ Skipped (Create event failed)"
    
    # Error Handling
    print("\n=== TESTING ERROR HANDLING ===")
    
    # Test 14: Malformed request
    success, _ = test_malformed_request()
    results["Error Handling - Malformed Request"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 15: Missing required fields
    success, _ = test_missing_required_fields()
    results["Error Handling - Missing Required Fields"] = "✅ Passed" if success else "❌ Failed"
    
    # Print summary
    print("\n=== Test Results Summary ===")
    for endpoint, result in results.items():
        print(f"{endpoint}: {result}")
    
    # Check if all tests passed
    all_passed = all(result == "✅ Passed" for result in results.values())
    print(f"\nOverall result: {'✅ All tests passed!' if all_passed else '❌ Some tests failed!'}")
    
    return results

if __name__ == "__main__":
    run_all_tests()
