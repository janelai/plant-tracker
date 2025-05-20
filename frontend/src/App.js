// App.js focuses on the application structure

// Routing
// Layout
// Application-specific providers
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
import PlantList from './components/PlantList';
import PlaceholderScreen from './screens/PlaceholderScreen';
import './App';

function App() {
  return (
    <PlantProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/add-plant" element={<AddPlantScreen />} />
            <Route path="/plant/:id" element={<PlantDetailScreen />} />
          </Routes>
        </div>
      </Router>
    </PlantProvider>
    // <Router>
    //   <div className="App">
    //     <Routes>
    //       <Route path="/" element={<HomeScreen />} />
    //     </Routes>
    //   </div>
    //   <div className="App">
    //     <Routes>
    //       <Route path="/" element={<HomeScreen />} />
    //       <Route path="/plant/:id" element={<PlaceholderScreen title="Plant Details" />} />
    //       <Route path="/add-plant" element={<PlaceholderScreen title="Add Plant" />} />
    //       <Route path="/care-log/:id" element={<PlaceholderScreen title="Care Log" />} />
    //       <Route path="/gallery/:id" element={<PlaceholderScreen title="Gallery" />} />
    //       <Route path="/calendar" element={<PlaceholderScreen title="Calendar" />} />
    //       <Route path="/settings" element={<PlaceholderScreen title="Settings" />} />
    //     </Routes>
    //   </div>
    // </Router>
    // <AuthProvider>
    //   <PlantProvider>
    //     <Router>
    //       <Routes>
    //         <Route path="/" element={<HomeScreen />} />
    //         <Route path="/plant/:id" element={<PlantDetailScreen />} />
    //         <Route path="/add-plant" element={<AddPlantScreen />} />
    //         <Route path="/care-log/:id" element={<CareLogScreen />} />
    //         <Route path="/gallery/:id" element={<GalleryScreen />} />
    //         <Route path="/calendar" element={<CalendarScreen />} />
    //         <Route path="/settings" element={<SettingsScreen />} />
    //       </Routes>
    //     </Router>
    //   </PlantProvider>
    // </AuthProvider>
    // <div className="App">
    //   <header className="App-header">
    //     <h1>Plant Care App</h1>
    //   </header>
    //   <main>
    //     <PlantList />
    //   </main>
    // </div>
  );
}

export default App;
