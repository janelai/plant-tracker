import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const PlantCard = ({ plant, onClick, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleCardClick = () => {
    navigate(`/plant/${plant._id}`);
  };
  
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent card click when delete button is clicked
    setShowConfirm(true);
  };
  
  const handleCancelDelete = (e) => {
    e.stopPropagation(); // Prevent card click
    setShowConfirm(false);
  };
  
  const handleConfirmDelete = async (e) => {
    e.stopPropagation(); // Prevent card click
    setIsDeleting(true);
    
    try {
      await onDelete(plant._id);
      // No need to navigate since the component will be removed from the list
    } catch (err) {
      console.error('Error deleting plant:', err);
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

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
    <div className="plant-card" onClick={handleCardClick}>
      <div className="plant-image">
        {/* TODO: Add plant image here if available */}
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
        <p className="added-date">Added: {formatDate(plant.createdAt)}</p>
        <div className="watering-info">
          <span className="watering-label">Waters every:</span>
          <span className="watering-value">{plant.wateringFrequency} days</span>
        </div>
      </div>

       {!showConfirm ? (
        <button 
          className="delete-button"
          onClick={handleDeleteClick}
          disabled={isDeleting}
        >
          🗑️
        </button>
      ) : (
        <div className="delete-confirm">
          <p>Delete plant?</p>
          <div className="delete-actions">
            <button 
              className="confirm-button"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Yes'}
            </button>
            <button 
              className="cancel-button"
              onClick={handleCancelDelete}
              disabled={isDeleting}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantCard;