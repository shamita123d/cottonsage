// src/context/SoilContext.jsx
import React, { createContext, useContext, useState } from "react";

const SoilContext = createContext();

export const useSoil = () => useContext(SoilContext);

export const SoilProvider = ({ children }) => {
  const [soilResult, setSoilResult] = useState(null);
  const [soilParams, setSoilParams] = useState(null); // nitrogen, phosphorus, etc.

  return (
    <SoilContext.Provider
      value={{ soilResult, setSoilResult, soilParams, setSoilParams }}
    >
      {children}
    </SoilContext.Provider>
  );
};
