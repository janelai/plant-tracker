import React, { createContext, useState, useEffect } from 'react';
import { getPlants, addPlant, updatePlant, deletePlant } from '../services/plantService';

export const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const data = await getPlants();
      setPlants(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch plants');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createPlant = async (plantData) => {
    try {
      const newPlant = await addPlant(plantData);
      setPlants([...plants, newPlant]);
      return newPlant;
    } catch (err) {
      setError('Failed to add plant');
      console.error(err);
      throw err;
    }
  };

  const editPlant = async (id, plantData) => {
    try {
      const updatedPlant = await updatePlant(id, plantData);
      setPlants(plants.map(plant => plant.id === id ? updatedPlant : plant));
      return updatedPlant;
    } catch (err) {
      setError('Failed to update plant');
      console.error(err);
      throw err;
    }
  };

  const removePlant = async (id) => {
    try {
      await deletePlant(id);
      setPlants(plants.filter(plant => plant.id !== id));
    } catch (err) {
      setError('Failed to delete plant');
      console.error(err);
      throw err;
    }
  };

  return (
    <PlantContext.Provider
      value={{
        plants,
        loading,
        error,
        fetchPlants,
        createPlant,
        editPlant,
        removePlant
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};