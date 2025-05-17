import React from "react";

const HelpPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-gradient-to-tr from-green-50 to-lime-100 rounded-3xl shadow-2xl animate-fade-in">
      <h1 className="text-4xl font-bold text-green-800 text-center mb-10">
        🌱 Soil Fertility Help & Guide
      </h1>

      {/* What is Soil Fertility */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
          What is Soil Fertility?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Soil fertility refers to the soil's ability to provide essential
          nutrients to plants in adequate quantities and proper balance. Fertile
          soil promotes strong root development, healthy growth, and high crop
          yields.
        </p>
      </section>

      {/* Soil Parameters */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Key Soil Parameters
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 text-sm sm:text-base">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="border px-4 py-2 text-left">Parameter</th>
                <th className="border px-4 py-2 text-left">Meaning</th>
                <th className="border px-4 py-2 text-left">Ideal Range</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700">
              <tr>
                <td className="border px-4 py-2">Nitrogen (N)</td>
                <td className="border px-4 py-2">
                  Leaf growth and chlorophyll production
                </td>
                <td className="border px-4 py-2">50–150 ppm</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Phosphorus (P)</td>
                <td className="border px-4 py-2">Root & flower development</td>
                <td className="border px-4 py-2">20–50 ppm</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Potassium (K)</td>
                <td className="border px-4 py-2">
                  Fruit formation & disease resistance
                </td>
                <td className="border px-4 py-2">100–200 ppm</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">pH</td>
                <td className="border px-4 py-2">Acidity/alkalinity of soil</td>
                <td className="border px-4 py-2">6.0–7.5</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Moisture</td>
                <td className="border px-4 py-2">Water content in soil</td>
                <td className="border px-4 py-2">20%–60%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Temperature</td>
                <td className="border px-4 py-2">
                  Affects microbial and plant activity
                </td>
                <td className="border px-4 py-2">15–35°C</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Reading Results */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-2">
          Understanding Your Report
        </h2>
        <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-2">
          <li>
            <strong>Soil Fertility:</strong> Overall health of your soil (Low,
            Moderate, High)
          </li>
          <li>
            <strong>Suggested Crops:</strong> Best crops based on your soil's
            nutrients and pH
          </li>
          <li>
            <strong>Fertilizer Recommendation:</strong> What nutrients your soil
            needs
          </li>
          <li>
            <strong>General Tip:</strong> Expert advice for improving fertility
          </li>
        </ul>
      </section>

      {/* Tips to Improve */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
          Tips to Improve Soil Fertility
        </h2>
        <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-2">
          <li>Use organic compost or green manure</li>
          <li>Rotate crops to reduce nutrient depletion</li>
          <li>Apply balanced NPK fertilizers</li>
          <li>Ensure proper irrigation and drainage</li>
          <li>Avoid excessive chemical use</li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-2xl font-semibold text-red-700 mb-4">
          ❓ Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <strong>Q:</strong> Why is my soil marked "Low Fertility"?
            <br />
            <strong>A:</strong> It may lack key nutrients or have a pH
            imbalance.
          </div>
          <div>
            <strong>Q:</strong> Can I grow crops if fertility is low?
            <br />
            <strong>A:</strong> Yes, but adding nutrients and organic material
            is highly recommended.
          </div>
          <div>
            <strong>Q:</strong> How often should I test my soil?
            <br />
            <strong>A:</strong> At least once every growing season or every 6–12
            months.
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
