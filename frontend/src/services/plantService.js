import api from './api';

export const getPlants = async () => {
  const response = await api.get('/plants');
  return response.data;
};

export const getPlantById = async (id) => {
  const response = await api.get(`/plants/${id}`);
  return response.data;
};

export const addPlant = async (plantData) => {
  const formData = new FormData();
  
  // Add text fields
  Object.keys(plantData).forEach(key => {
    if (key !== 'image') {
      formData.append(key, plantData[key]);
    }
  });
  
  // Add image if exists
  if (plantData.image) {
    formData.append('image', plantData.image);
  }
  
  const response = await api.post('/plants', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};

export const updatePlant = async (id, plantData) => {
  const formData = new FormData();
  
  // Add text fields
  Object.keys(plantData).forEach(key => {
    if (key !== 'image') {
      formData.append(key, plantData[key]);
    }
  });
  
  // Add image if exists
  if (plantData.image) {
    formData.append('image', plantData.image);
  }
  
  const response = await api.put(`/plants/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};

export const deletePlant = async (id) => {
  await api.delete(`/plants/${id}`);
  return true;
};

export const uploadPlantImage = async (plantId, imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await api.post(`/plants/${plantId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};

export const getPlantImages = async (plantId) => {
  const response = await api.get(`/plants/${plantId}/images`);
  return response.data;
};

export const logCareActivity = async (plantId, logData) => {
  const response = await api.post(`/plants/${plantId}/care-logs`, logData);
  return response.data;
};

export const getCareLogs = async (plantId) => {
  const response = await api.get(`/plants/${plantId}/care-logs`);
  return response.data;
};