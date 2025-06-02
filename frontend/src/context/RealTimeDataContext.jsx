// RealtimeContext.js
import React, { createContext, useContext } from 'react';
import { useRealTimeSimulation } from '../api/useBackendConnection';

const RealTimeContext = createContext(null);

export const RealTimeProvider = ({ children }) => {
  const realTime = useRealTimeSimulation(); // only called once!

  return (
    <RealTimeContext.Provider value={realTime}>
      {children}
    </RealTimeContext.Provider>
  );
};

export const useRealTime = () => useContext(RealTimeContext);
