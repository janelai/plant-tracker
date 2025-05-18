import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

// Create the context with default values
export const PlantContext = createContext({
  plants: [],
  loading: true,
  error: null,
  fetchPlants: () => {},
});

export function PlantProvider({ children }) {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const response = await api.get('/plants');
      setPlants(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching plants:', err);
      setError('Failed to fetch plants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const value = {
    plants,
    loading,
    error,
    fetchPlants,
  };

  return (
    <PlantContext.Provider value={value}>
      {children}
    </PlantContext.Provider>
  );
}