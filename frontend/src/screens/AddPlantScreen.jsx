import React from 'react';
import PlantForm from '../components/PlantForm';
import { Link } from 'react-router-dom';

function AddPlantScreen() {
  return (
    <div className="add-plant-screen">
      <header className="screen-header">
        <h1>Add New Plant</h1>
        <Link to="/" className="back-link">Back to Plants</Link>
      </header>
      <main>
        <PlantForm />
      </main>
    </div>
  );
}

export default AddPlantScreen;