import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService, Event, EventFilters } from '../services/eventService';

// Hook for fetching all events with filtering
export const useEvents = (filters?: EventFilters) => {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => eventService.getAllEvents(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching a single event by ID
export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => eventService.getEventById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for fetching events by category
export const useEventsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['events', 'category', category],
    queryFn: () => eventService.getEventsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for fetching categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => eventService.getCategories(),
    staleTime: 10 * 60 * 1000, // Categories change less frequently
  });
};

// Hook for searching events
export const useSearchEvents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<EventFilters>({});

  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events', 'search', searchQuery, searchFilters],
    queryFn: () => eventService.getAllEvents({ ...searchFilters, search: searchQuery }),
    enabled: searchQuery.length > 0 || Object.keys(searchFilters).length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });

  const search = (query: string, filters?: EventFilters) => {
    setSearchQuery(query);
    setSearchFilters(filters || {});
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchFilters({});
  };

  return {
    events: events || [],
    isLoading,
    error,
    search,
    clearSearch,
    searchQuery,
    searchFilters,
  };
};

// Hook for creating events
export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) =>
      eventService.createEvent(event),
    onSuccess: () => {
      // Invalidate and refetch events
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

// Hook for updating events
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, event }: { id: string; event: Partial<Event> }) =>
      eventService.updateEvent(id, event),
    onSuccess: (data) => {
      // Invalidate and refetch events
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['event', data.id] });
    },
  });
};

// Hook for deleting events
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventService.deleteEvent(id),
    onSuccess: () => {
      // Invalidate and refetch events
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

// Hook for managing event favorites (stored in localStorage for now)
export const useEventFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('eventFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (eventId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId];
      
      localStorage.setItem('eventFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (eventId: string) => favorites.includes(eventId);

  const getFavoriteEvents = () => {
    return useQuery({
      queryKey: ['favoriteEvents', favorites],
      queryFn: async () => {
        const allEvents = await eventService.getAllEvents();
        return allEvents.filter((event) => favorites.includes(event.id));
      },
      enabled: favorites.length > 0,
    });
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteEvents,
  };
};