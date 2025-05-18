import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlantContext } from '../contexts/PlantContext';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import PlantCard from '../components/plant/PlantCard';
import Button from '../components/common/Button';
import PlantList from '../components/PlantList';

const HomeScreen = () => {
  // const { plants, loading, error } = useContext(PlantContext);
  // const navigate = useNavigate();

  // const handleAddPlant = () => {
  //   navigate('/add-plant');
  // };

  // const handlePlantClick = (id) => {
  //   navigate(`/plant/${id}`);
  // };

  // if (loading) return <div>Loading plants...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    // <div className="home-screen">
    //   <AppHeader title="My Plants">
    //     <Button onClick={handleAddPlant} icon="plus" label="Add Plant" />
    //   </AppHeader>

    //   <div className="plant-list">
    //     {plants.length === 0 ? (
    //       <div className="empty-state">
    //         <p>You don't have any plants yet. Add your first plant!</p>
    //         <Button onClick={handleAddPlant} label="Add Plant" primary />
    //       </div>
    //     ) : (
    //       plants.map(plant => (
    //         <PlantCard
    //           key={plant.id}
    //           plant={plant}
    //           onClick={() => handlePlantClick(plant.id)}
    //         />
    //       ))
    //     )}
    //   </div>
    //   <AppFooter activePage="plants" />
    // </div>
    <div className="home-screen">
      <header>
        <h1>My Plants</h1>
      </header>
      <main>
        <PlantList />
      </main>
    </div>
  );
};

export default HomeScreen;