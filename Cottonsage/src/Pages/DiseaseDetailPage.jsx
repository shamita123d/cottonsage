/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  CalendarDays,
  Flame,
  HeartPulse,
  Leaf,
  ShieldAlert,
  Thermometer,
  TreePalm,
  Printer,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchDiseaseDetail } from "../api/fetchDiseaseDetail";
import { useDisease } from "../context/DiseaseContext";

const DiseaseDetailPage = () => {
  const { diseaseName, image } = useDisease();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!diseaseName) {
      toast.error("Please provide the correct image.");
      return;
    }

    const loadDiseaseData = async () => {
      const toastId = toast.loading("Loading disease info...");
      try {
        const response = await fetchDiseaseDetail(diseaseName);
        setData({
          ...response,
          symptoms: formatAsArray(response.symptoms),
          prevention: formatAsArray(response.prevention),
        });
        toast.dismiss(toastId);
        toast.success("Disease information loaded!");
      } catch (error) {
        toast.dismiss(toastId);
        toast.error(`Failed to load data: ${error}`);
      }
    };

    loadDiseaseData();
  }, [diseaseName]);

  const handlePrint = () => {
    window.print();
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="w-12 h-12 border-4 border-t-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-emerald-100 py-16 px-4 flex justify-center items-start print:bg-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-xl rounded-3xl border border-green-100 max-w-5xl w-full p-6 md:p-10 print:shadow-none print:bg-white print:text-black"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-green-700 text-center mb-10 tracking-tight"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          🌱 {data.diseaseName}
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-10 mb-12 items-center">
          <motion.img
            src={image || data.image}
            alt="Uploaded"
            className="w-72 h-72 rounded-3xl object-cover shadow-lg border-4 border-green-200 hover:scale-105 transition-transform duration-300 print:shadow-none print:border-none"
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
          />

          <div className="space-y-5 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800">
              {data.name}
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <Tag
                icon={<Flame size={16} />}
                label={`Disease: ${data.diseaseName}`}
                color="bg-red-100 text-red-700"
              />
              <Tag
                icon={<Flame size={16} />}
                label={`Severity: ${data.severity}`}
                color="bg-red-200 text-red-800"
              />
              <Tag
                icon={<TreePalm size={16} />}
                label={`Stage: ${data.stage}`}
                color="bg-yellow-100 text-yellow-700"
              />
              <Tag
                icon={<CalendarDays size={16} />}
                label={`Season: ${data.season}`}
                color="bg-emerald-100 text-emerald-700"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          <AnimatedInfoBlock
            icon={<ShieldAlert className="text-red-500" />}
            title="Symptoms"
            items={data.symptoms}
          />
          <AnimatedInfoBlock
            icon={<HeartPulse className="text-blue-500" />}
            title="Prevention"
            items={data.prevention}
          />
          <AnimatedInfoBlock
            icon={<Leaf className="text-green-600" />}
            title="Causes"
            description={data.causes}
          />
          <AnimatedInfoBlock
            icon={<Thermometer className="text-yellow-500" />}
            title="Treatment"
            description={data.treatment}
          />
        </div>

        <div className="flex justify-end mt-12 gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition text-sm shadow-md"
          >
            <Printer size={18} /> Print Report
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const formatAsArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value
    .split("*")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

const AnimatedInfoBlock = ({ icon, title, items, description }) => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex items-center gap-2 mb-4 text-green-700 font-semibold text-xl">
      {icon}
      <h3>{title}</h3>
    </div>
    {items?.length ? (
      <ul className="list-disc list-inside text-gray-800 text-base space-y-2 pl-2">
        {items.map((item, index) => (
          <li key={index} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
        {description}
      </p>
    )}
  </motion.section>
);

const Tag = ({ icon, label, color }) => (
  <span
    className={`inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium ${color} rounded-full shadow-sm hover:scale-105 transition-transform duration-200`}
  >
    {icon}
    {label}
  </span>
);

export default DiseaseDetailPage;
