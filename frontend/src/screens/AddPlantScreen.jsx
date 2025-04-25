import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlantContext } from '../contexts/PlantContext';
import AppHeader from '../components/layout/AppHeader';
import Button from '../components/common/Button';
import PlantForm from '../components/plant/PlantForm';

const AddPlantScreen = () => {
  const [loading, setLoading] = useState(false);
  const { createPlant } = useContext(PlantContext);
  const navigate = useNavigate();

  const handleSubmit = async (plantData) => {
    try {
      setLoading(true);
      const newPlant = await createPlant(plantData);
      navigate(`/plant/${newPlant.id}`);
    } catch (error) {
      console.error('Error adding plant:', error);
      alert('Failed to add plant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="add-plant-screen">
      <AppHeader 
        title="Add New Plant" 
        leftButton={{ icon: 'arrow-left', onClick: handleCancel }}
      />
      
      <div className="content">
        <PlantForm 
          onSubmit={handleSubmit} 
          loading={loading}
          submitButtonText="Add Plant"
        />
      </div>
    </div>
  );
};

export default AddPlantScreen;