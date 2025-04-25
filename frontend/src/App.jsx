import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PlantProvider } from './contexts/PlantContext';
import { AuthProvider } from './contexts/AuthContext';
import HomeScreen from './screens/HomeScreen';
import PlantDetailScreen from './screens/PlantDetailScreen';
import AddPlantScreen from './screens/AddPlantScreen';
import CareLogScreen from './screens/CareLogScreen';
import GalleryScreen from './screens/GalleryScreen';
import CalendarScreen from './screens/CalendarScreen';
import SettingsScreen from './screens/SettingsScreen';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <PlantProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/plant/:id" element={<PlantDetailScreen />} />
            <Route path="/add-plant" element={<AddPlantScreen />} />
            <Route path="/care-log/:id" element={<CareLogScreen />} />
            <Route path="/gallery/:id" element={<GalleryScreen />} />
            <Route path="/calendar" element={<CalendarScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </Router>
      </PlantProvider>
    </AuthProvider>
  );
}

export default App;