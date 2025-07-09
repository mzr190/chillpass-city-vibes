// API service for events
export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price?: string;
  category: string;
  image?: string;
  capacity?: string;
  age_restriction?: string;
  organizer: string;
  ticket_url?: string;
  created_at: string;
  updated_at: string;
}

export interface EventFilters {
  category?: string;
  location?: string;
  search?: string;
  limit?: number;
}

const API_BASE_URL = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;

class EventService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/api`;
  }

  async getAllEvents(filters?: EventFilters): Promise<Event[]> {
    const url = new URL(`${this.baseUrl}/events`);
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }
    
    return response.json();
  }

  async getEventById(id: string): Promise<Event> {
    const response = await fetch(`${this.baseUrl}/events/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }
    
    return response.json();
  }

  async getEventsByCategory(category: string): Promise<Event[]> {
    const response = await fetch(`${this.baseUrl}/events/category/${category}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch events by category: ${response.statusText}`);
    }
    
    return response.json();
  }

  async getCategories(): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}/categories`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.categories || [];
  }

  async searchEvents(query: string): Promise<Event[]> {
    return this.getAllEvents({ search: query });
  }

  async createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> {
    const response = await fetch(`${this.baseUrl}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.statusText}`);
    }
    
    return response.json();
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    const response = await fetch(`${this.baseUrl}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update event: ${response.statusText}`);
    }
    
    return response.json();
  }

  async deleteEvent(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/events/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete event: ${response.statusText}`);
    }
  }
}

export const eventService = new EventService();