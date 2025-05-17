import { BookOpen, Download, FileText, ShieldAlert } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDisease } from "../Context/DiseaseContext";

const CottonDiseaseHelp = () => {
  const { setDiseaseName } = useDisease();
  const navigate = useNavigate();

  const handleDiseaseClick = (name) => {
    setDiseaseName(name);
    navigate(`/disease-details?name=${encodeURIComponent(name)}`);
  };

  const faqData = [
    {
      question: "🕒 What is the best time to check for disease?",
      answer:
        "Early mornings are ideal, as symptoms like dew-induced fungal growth and leaf curling are more visible during this time.",
    },
    {
      question: "💧 Can cotton diseases spread through water?",
      answer:
        "Yes, many fungal and bacterial diseases spread through water splashes during irrigation or rainfall.",
    },
    {
      question: "🌱 What are organic ways to prevent diseases?",
      answer:
        "You can use neem oil spray, crop rotation, and organic compost to enhance plant immunity naturally.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
        🐛 Cotton Disease Help & Guidance
      </h1>

      <div className="grid md:grid-cols-2 gap-8 text-gray-700">
        {/* Common Diseases */}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-red-600">
            <ShieldAlert className="text-red-500" /> Common Diseases
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {[
              "Bacterial Blight",
              "Fusarium Wilt",
              "LeafCurlVirus",
              "Alternaria",
              "Aphids",
              "Powdery Mildew",
              "Target spot",
            ].map((disease) => (
              <li key={disease}>
                <button
                  onClick={() => handleDiseaseClick(disease)}
                  className="text-left text-blue-700 hover:underline"
                >
                  {disease.replace(/([A-Z])/g, " $1").trim()}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Identification Help */}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-purple-700">
            <BookOpen /> How to Identify
          </h2>
          <p>Cotton plant diseases can be identified through:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Leaf spots, curling, or yellowing</li>
            <li>Stem wilting or discoloration</li>
            <li>Fungal growth on leaves or bolls</li>
            <li>Reduced boll development</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-yellow-600">
            <FileText /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map(({ question, answer }, index) => (
              <div
                key={index}
                className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400"
              >
                <p className="font-semibold">{question}</p>
                <p className="text-gray-700 text-sm mt-1">{answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Guide */}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-green-700">
            <Download /> Download Guide
          </h2>
          <p>
            Click below to download our Cotton Disease Prevention Guide in PDF
            format.
          </p>
          <button
            onClick={() => alert("📄 PDF download feature coming soon!")}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow"
          >
            📥 Download Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default CottonDiseaseHelp;
