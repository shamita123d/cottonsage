import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import NotFoundPage from "./component/NotFoundPage";
import SimpleCameraCapture from "./component/SimpleCameraCapture";
import CottonDiseaseHelpPage from "./Pages/CottonDiseaseHelpPage";
import DiseaseDetailPage from "./Pages/DiseaseDetailPage";
import FreshImage from "./Pages/FreshImage";
import HelpPage from "./Pages/HelpPage";
import MainPage from "./Pages/MainPage";
import SoilAnalysisResult from "./Pages/SoilAnalysisResult";
import SoilFertility from "./Pages/SoilFertility";
import Suggestion from "./Pages/Suggestion";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/soil-check" element={<SoilFertility />} />
        <Route path="/soil-analyze" element={<SoilAnalysisResult />} />
        <Route path="/suggestions" element={<Suggestion />} />
        <Route path="/disease-details" element={<DiseaseDetailPage />} />
        <Route path="/fresh-image" element={<FreshImage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/disease-help" element={<CottonDiseaseHelpPage />} />
        <Route path="/live-check" element={<SimpleCameraCapture />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
