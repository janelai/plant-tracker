import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { PlantContext } from '../contexts/PlantContext';
import { useNavigate } from 'react-router-dom';
import PlantCard from './plant/PlantCard';

function PlantList() {
  const { plants, loading, error, fetchPlants, removePlant } = useContext(PlantContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlants();
  }, []);
  
  const handleAddPlant = () => {
    navigate('/add-plant'); // Navigate to the add plant route
  };

  const handleDeletePlant = async (id) => {
    const success = await removePlant(id);
    if (success) {
      // You could show a toast/notification here
      console.log('Plant deleted successfully');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <p>Loading plants...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="plant-list-container">
      <div className="plant-list-header">
        <h2>My Plants</h2>
        <button 
          className="add-button"
          onClick={handleAddPlant}
        >
          Add New Plant
        </button>
      </div>
      
      {plants.length === 0 ? (
        <div className="empty-state">
          <p>No plants yet. Start growing your collection!</p>
          <button 
            className="add-button-large"
            onClick={handleAddPlant}
          >
            Add Your First Plant
          </button>
        </div>
      ) : (
        <div className="plant-grid">
          {plants.map((plant) => (
            <PlantCard 
              key={plant._id} 
              plant={plant} 
              onDelete={handleDeletePlant} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PlantList;