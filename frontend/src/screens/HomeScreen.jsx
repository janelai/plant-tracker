import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlantContext } from '../contexts/PlantContext';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import PlantCard from '../components/plant/PlantCard';
import Button from '../components/common/Button';
import PlantList from '../components/PlantList';
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const t = useTranslation();

  return (
    <div className="home-screen">
      <header className="app-header">
        <h1>{t('HOMESCREEN-MY_PLANTS')}</h1>
      </header>
      <main>
        <PlantList />
      </main>
    </div>
  );
};

export default HomeScreen;