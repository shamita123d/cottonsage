import { createContext, useContext, useState } from "react";

const DiseaseContext = createContext();

export const DiseaseProvider = ({ children }) => {
  const [diseaseName, setDiseaseName] = useState(null);
  const [image, setImage] = useState(null); 

  return (
    <DiseaseContext.Provider
      value={{ diseaseName, setDiseaseName, image, setImage }}
    >
      {children}
    </DiseaseContext.Provider>
  );
};

export const useDisease = () => useContext(DiseaseContext);
