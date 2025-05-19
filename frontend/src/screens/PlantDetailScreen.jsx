import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PlantContext } from '../contexts/PlantContext';
import api from '../services/api';

function PlantDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { removePlant } = useContext(PlantContext);
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/plants/${id}`);
        setPlant(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching plant details:', err);
        setError('Could not load plant details');
      } finally {
        setLoading(false);
      }
    };

    fetchPlantDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await removePlant(id);
      navigate('/');
    } catch (err) {
      console.error('Error deleting plant:', err);
      setError('Failed to delete plant');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="loading">Loading plant details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!plant) return <div className="not-found">Plant not found</div>;

  return (
    <div className="plant-detail-screen">
      <div className="detail-header">
        <Link to="/" className="back-link">
          &larr; Back to Plants
        </Link>
        <div className="header-actions">
          <button className="edit-button">Edit Plant</button>
          <button 
            className="delete-button"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Plant
          </button>
        </div>
      </div>

      <div className="plant-detail-card">
        <div className="plant-detail-image">
          <div className="plant-icon-large">🌿</div>
        </div>
        
        <div className="plant-detail-content">
          <h1>{plant.name}</h1>
          {plant.species && <h2 className="species">{plant.species}</h2>}
          
          <div className="plant-stats">
            <div className="stat-item">
              <span className="stat-label">Added On</span>
              <span className="stat-value">{formatDate(plant.createdAt)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Watering Schedule</span>
              <span className="stat-value">Every {plant.wateringFrequency} days</span>
            </div>
          </div>
          
          <div className="care-info">
            <h3>Care Information</h3>
            <p>
              {plant.description || 'No care information available. Add details by editing this plant.'}
            </p>
          </div>
          
          <div className="care-history">
            <h3>Care History</h3>
            <p>No care actions recorded yet.</p>
            <button className="log-care-button">Log Care Action</button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirmation-modal">
          <div className="modal-content">
            <h2>Delete Plant</h2>
            <p>Are you sure you want to delete <strong>{plant.name}</strong>?</p>
            <p className="warning">This action cannot be undone.</p>
            
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-button"
                onClick={handleDelete}
              >
                Delete Plant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlantDetailScreen;