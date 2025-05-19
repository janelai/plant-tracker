import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function PlantForm() {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [wateringFrequency, setWateringFrequency] = useState(7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      console.log('Submitting plant data:', { name, species, wateringFrequency });
      
      const response = await api.post('/plants', {
        name,
        species,
        wateringFrequency: parseInt(wateringFrequency)
      });
      
      console.log('Plant added successfully:', response.data);
      setSuccessMessage('Plant added successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1500); // Give the user time to see the success message
    } catch (err) {
      console.error('Error adding plant - Full error:', err);
      
      // More detailed error logging
      if (err.response) {
        // The server responded with a status code outside the 2xx range
        console.error('Server response data:', err.response.data);
        console.error('Server response status:', err.response.status);
        
        // Display more specific error message to the user
        if (err.response.data && err.response.data.message) {
          setError(`Failed to add plant: ${err.response.data.message}`);
        } else {
          setError(`Failed to add plant. Server returned status ${err.response.status}`);
        }
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received from server');
        setError('Failed to add plant. No response from server - check your connection.');
      } else {
        // Something happened in setting up the request
        console.error('Error message:', err.message);
        setError(`Failed to add plant: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="plant-form">
      <h2>Add New Plant</h2>
      
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      <div className="form-group">
        <label htmlFor="name">Plant Name *</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g., Snake Plant"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="species">Species (optional)</label>
        <input
          type="text"
          id="species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          placeholder="e.g., Sansevieria trifasciata"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="wateringFrequency">Watering Frequency (days)</label>
        <input
          type="number"
          id="wateringFrequency"
          value={wateringFrequency}
          onChange={(e) => setWateringFrequency(e.target.value)}
          min="1"
          max="90"
        />
      </div>
      
      <div className="form-actions">
        <button 
          type="button" 
          className="btn-secondary"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Plant'}
        </button>
      </div>
    </form>
  );
}

export default PlantForm;