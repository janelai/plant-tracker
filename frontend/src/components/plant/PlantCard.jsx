import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const PlantCard = ({ plant, onClick }) => {
  const getWateringStatus = () => {
    if (!plant.next_watering) return null;
    
    const now = new Date();
    const nextWatering = new Date(plant.next_watering);
    
    if (nextWatering < now) {
      return {
        text: 'Water today!',
        className: 'watering-overdue'
      };
    }
    
    const daysUntil = Math.ceil((nextWatering - now) / (1000 * 60 * 60 * 24));
    
    if (daysUntil <= 2) {
      return {
        text: `Water in ${daysUntil} day${daysUntil === 1 ? '' : 's'}`,
        className: 'watering-soon'
      };
    }
    
    return {
      text: `Water in ${daysUntil} days`,
      className: 'watering-scheduled'
    };
  };

  const wateringStatus = getWateringStatus();

  return (
    <div className="plant-card" onClick={onClick}>
      <div className="plant-image">
        {plant.image_url ? (
          <img src={plant.image_url} alt={plant.name} />
        ) : (
          <div className="placeholder-image">
            <span>🌿</span>
          </div>
        )}
      </div>
      <div className="plant-info">
        <h3>{plant.name}</h3>
        <p className="species">{plant.species || 'Unknown species'}</p>
        {wateringStatus && (
          <div className={`watering-badge ${wateringStatus.className}`}>
            {wateringStatus.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantCard;