import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  return (
    <AppContext.Provider
      value={{
        pharmacies,
        setPharmacies,
        loading,
        setLoading,
        userLocation,
        setUserLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
