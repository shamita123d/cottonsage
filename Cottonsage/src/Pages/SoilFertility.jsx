import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSoil } from "../context/SoilContext";

const SoilFertility = () => {
  const [soilParamsState, setSoilParamsState] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    water: "",
    humidity: "",
    temperature: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { setSoilResult, setSoilParams } = useSoil(); // <-- include setSoilParams
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSoilParamsState({ ...soilParamsState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/soil/parameters",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(soilParamsState),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit soil parameters.");
      }

      const result = await response.json();

      if (!result || Object.keys(result).length === 0) {
        throw new Error("Received empty result from backend.");
      }

      setSoilResult(result);
      setSoilParams(soilParamsState); // <-- now it's stored in context
      navigate("/soil-analyze");
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto my-12 p-8 bg-white shadow-xl rounded-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Enter Soil Parameters
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { label: "Nitrogen (N)", name: "nitrogen" },
          { label: "Phosphorus (P)", name: "phosphorus" },
          { label: "Potassium (K)", name: "potassium" },
          { label: "Soil pH", name: "ph" },
          { label: "Water Level (%)", name: "water" },
          { label: "Humidity (%)", name: "humidity" },
          { label: "Temperature (°C)", name: "temperature" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="text-gray-700 font-medium mb-1"
            >
              {field.label}
            </label>
            <input
              type="number"
              step="0.1"
              id={field.name}
              name={field.name}
              value={soilParamsState[field.name]}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Soil"}
          </motion.button>

          {errorMsg && (
            <p className="mt-4 text-center text-red-500">{errorMsg}</p>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default SoilFertility;
