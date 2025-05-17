import React from "react";

const FreshCottonInfo = ({ uploadedImageUrl }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-green-100 p-6 md:p-12">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-green-700 mb-4">
          Fresh Cotton Plant Report
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Your uploaded image indicates a healthy, thriving cotton plant. Here's
          an in-depth guide to help you understand, compare, and maintain this
          ideal condition.
        </p>
      </div>

      {/* Uploaded Image Display */}
      {uploadedImageUrl && (
        <div className="flex justify-center mb-10">
          <img
            src={uploadedImageUrl}
            alt="Uploaded Fresh Cotton Plant"
            className="w-full max-w-lg rounded-2xl shadow-xl"
          />
        </div>
      )}

      {/* Info Article */}
      <div className="max-w-5xl mx-auto space-y-10 text-gray-800 text-lg leading-relaxed">
        {/* Characteristics Section */}
        <section>
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            🌿 Characteristics of a Healthy Cotton Plant
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Bright green, symmetrical leaves without any yellowing or black
              spots.
            </li>
            <li>
              Sturdy stems that support upright growth and early boll formation.
            </li>
            <li>
              Consistent branching pattern and no signs of pest or fungal
              activity.
            </li>
            <li>Healthy root system with no signs of waterlogging or rot.</li>
          </ul>
        </section>

        {/* Growth Infographic */}
        <section>
          {/* <h2 className="text-3xl font-bold text-green-800 mb-2">
            📈 Cotton Growth Timeline (Infographic)
          </h2> */}
         
        </section>

        {/* Visual Comparison */}
        <section>
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            🔍 Fresh vs Diseased Cotton Plant
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-xl font-semibold text-green-700">
                🌱 Healthy
              </h3>
              <ul className="list-disc pl-5 text-sm mt-2">
                <li>Leaves are green and lush</li>
                <li>Stems upright and strong</li>
                <li>No signs of pests or mold</li>
              </ul>
              <img
                src="../../public/freshImagectn.jpeg"
                alt="Healthy Plant"
                className="rounded-lg mt-3 shadow"
              />
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-xl font-semibold text-red-600">
                💀 Diseased
              </h3>
              <ul className="list-disc pl-5 text-sm mt-2">
                <li>Leaves show black/brown spots</li>
                <li>Stems are bent or weak</li>
                <li>Possible powdery mildew or wilt</li>
              </ul>
              <img
                src="../../public/DiseasedCtn.jpeg"
                alt="Diseased Plant"
                className="rounded-lg mt-3 shadow"
              />
            </div>
          </div>
        </section>

        {/* Maintenance Tips */}
        <section>
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            💡 Healthy Maintenance Tips
          </h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li>
              Use soil rich in potassium and nitrogen during different stages.
            </li>
            <li>
              Follow crop rotation with legumes or cereals to restore soil
              nutrients.
            </li>
            <li>Remove weeds regularly to avoid nutrient competition.</li>
            <li>
              Apply neem-based bio-pesticides or Trichoderma for root
              protection.
            </li>
          </ol>
        </section>

        {/* Region-Specific Recommendations */}
        <section>
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            🗺 Regional Tips (India)
          </h2>
          <ul className="space-y-2">
            <li>
              <strong>Maharashtra:</strong> Use Bt cotton seeds. Focus on
              rain-fed irrigation cycles. Monitor for pink bollworm.
            </li>
            <li>
              <strong>Punjab & Haryana:</strong> Practice timely sowing
              (May-June). Use drip irrigation to save water.
            </li>
            <li>
              <strong>Tamil Nadu:</strong> Use varieties like MCU-5 and Suvin.
              Avoid waterlogging during the NE monsoon.
            </li>
            <li>
              <strong>Gujarat:</strong> Prepare land in March. Use resistant
              hybrids and schedule fertilizer doses appropriately.
            </li>
          </ul>
        </section>

        {/* Print PDF Button */}
        <section className="text-center mt-12">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-xl shadow transition"
          >
            🖨 Print / Download Report as PDF
          </button>
        </section>
      </div>
    </div>
  );
};

export default FreshCottonInfo;
