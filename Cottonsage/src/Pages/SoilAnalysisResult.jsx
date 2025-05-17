import React from "react";
import { useSoil } from "../context/SoilContext";

const SoilAnalysisResult = () => {
  const { soilResult, soilParams } = useSoil();

  if (!soilResult) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        No soil analysis result available. Please submit the form first.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gradient-to-br from-emerald-50 to-lime-100 rounded-3xl shadow-2xl animate-fade-in">
      <h2 className="text-4xl font-bold text-center text-green-800 mb-8">
        🌱 Soil Analysis Report
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold text-green-700">🌿 Nitrogen</h3>
          <p>{soilParams?.nitrogen ?? "N/A"}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold text-green-700">🌿 Phosphorus</h3>
          <p>{soilParams?.phosphorus ?? "N/A"}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold text-green-700">🌿 Potassium</h3>
          <p>{soilParams?.potassium ?? "N/A"}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold text-green-700">💧 pH</h3>
          <p>{soilParams?.ph ?? "N/A"}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold text-green-700">💧 Water</h3>
          <p>{soilParams?.water ?? "N/A"}</p>
        </div>
      </div>

      <div className="space-y-5 text-gray-700">
        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold text-blue-700 mb-1">
            🧪 Soil Fertility
          </h3>
          <p>{soilResult.soilFertility}</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold text-green-700 mb-1">
            🌾 Suggested Crops
          </h3>
          <p>{soilResult.suggestedCrops}</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold text-yellow-700 mb-1">
            💊 Fertilizer Recommendation
          </h3>
          <p>{soilResult.fertilizerRecommendation}</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold text-purple-700 mb-1">
            💡 General Tip
          </h3>
          <p>{soilResult.generalTip}</p>
        </div>
      </div>
    </div>
  );
};

export default SoilAnalysisResult;
