import React, { useState, useEffect } from 'react';
import api from '../services/api';

function PlantList() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await api.get('/plants');
        setPlants(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching plants');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPlants();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>My Plants</h2>
      {plants.length === 0 ? (
        <p>No plants yet. Add your first plant!</p>
      ) : (
        <ul>
          {plants.map(plant => (
            <li key={plant.id || plant._id}>
              {plant.name} - {plant.species || 'Unknown species'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlantList;