import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { PlantContext } from '../contexts/PlantContext';

function PlantList() {
  const { plants, loading, error } = useContext(PlantContext);

  if (loading) return <p>Loading plants...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div>
      <h2>My Plants</h2>
      
      {plants.length === 0 ? (
        <p>No plants found. Add your first plant!</p>
      ) : (
        <ul className="plant-list">
          {plants.map((plant, index) => (
            <li key={plant.id || plant._id || index}>
              {plant.name || 'Unnamed plant'} 
              {plant.species && ` - ${plant.species}`}
            </li>
          ))}
        </ul>
      )}
      
      <button className="add-button">Add New Plant</button>
    </div>
  );
}

export default PlantList;