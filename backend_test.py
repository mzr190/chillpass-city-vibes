import requests
import json
import os
import sys
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from frontend/.env
load_dotenv(Path('/app/frontend/.env'))

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

def run_all_tests():
    """Run all API tests"""
    print("Starting API tests...")
    
    # Dictionary to store test results
    results = {}
    
    # Test 1: Get all events
    success, events = test_get_all_events()
    results["GET /api/events"] = "✅ Passed" if success else "❌ Failed"
    
    # If we have events, use the first one's ID for the next test
    event_id = events[0]['id'] if success and events else "1"
    
    # Test 2: Get event by ID
    success, _ = test_get_event_by_id(event_id)
    results[f"GET /api/events/{event_id}"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 3: Get events by category
    success, _ = test_get_events_by_category("Música")
    results["GET /api/events/category/Música"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 4: Get all categories
    success, _ = test_get_categories()
    results["GET /api/categories"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 5: Search events by category
    success, _ = test_search_events_by_category("Música")
    results["GET /api/events?category=Música"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 6: Search events by location
    success, _ = test_search_events_by_location("Bellavista")
    results["GET /api/events?location=Bellavista"] = "✅ Passed" if success else "❌ Failed"
    
    # Test 7: Search events by keyword
    success, _ = test_search_events_by_keyword("jazz")
    results["GET /api/events?search=jazz"] = "✅ Passed" if success else "❌ Failed"
    
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