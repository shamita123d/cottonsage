import axios from "axios";
import { motion } from "framer-motion";
import { Camera, RefreshCcw, UploadCloud, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

import { useDisease } from "../Context/DiseaseContext";
import { uploadImage } from "../api/uploadImage";

const MainPage = () => {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isCotton, setIsCotton] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setImage, setDiseaseName, image } = useDisease();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
    setIsCotton(null);
    setIsCameraOn(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
    setIsCotton(null);
    setIsCameraOn(false);
  };

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      setImage(screenshot);
      setIsCotton(null);
    }
  };

  const stopCamera = () => {
    const stream = webcamRef.current?.video?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOn(false);
  };

  const resumeCamera = () => {
    setIsCameraOn(true);
    setImage(null);
  };

  const sendImageToFlask = async () => {
    if (!image) return toast.error("Please upload or capture an image.");

    setLoading(true);
    const toastId = toast.loading("Checking if it's a cotton plant...");

    try {
      const res = await fetch(image);
      const blob = await res.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://cotton-checker.onrender.com/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);

      toast.dismiss(toastId);
      const { result } = response.data;
      const isCottonImage = result.includes("Yes, this is a cotton image.");
      setIsCotton(isCottonImage);

      if (isCottonImage) {
        toast.success("✅ Cotton image confirmed!");
      } else {
        toast.error("🚫 Not a cotton plant.");
      }
    } catch (error) {
      // toast.dismiss(toastId);
      toast.error("Failed to verify cotton image.");
    } finally {
      setLoading(false);
    }
  };

  const sendImageToBackend = async () => {
    if (!image) return toast.error("Image not found.");
    setLoading(true);
    const toastId = toast.loading("Analyzing disease...");

    try {
      const result = await uploadImage(image);
      toast.dismiss(toastId);
      toast.success("Disease analyzed!");

      setDiseaseName(result.diseaseName);

      if (result.freshness === "fresh") {
        navigate("/fresh-image");
      } else {
        navigate("/disease-details");
      }
    } catch (error) {
      // toast.dismiss(toastId);
      toast.error("Disease analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-lime-50 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/70 backdrop-blur-lg border border-green-200 shadow-xl rounded-3xl max-w-4xl w-full p-6 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-green-800">
          🌿 Cotton Plant Disease Detector
        </h1>

        {/* Image area */}
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          <div className="w-full md:w-1/2">
            {isCameraOn ? (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/png"
                className="rounded-xl w-full h-64 object-cover border"
              />
            ) : (
              <div
                className="w-full h-64 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl bg-white"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="fileInput"
                  className="text-gray-500 text-center cursor-pointer"
                >
                  <UploadCloud
                    className="mx-auto mb-2 text-green-500"
                    size={32}
                  />
                  Drag & Drop or{" "}
                  <span className="underline text-blue-600">Browse</span>
                </label>
              </div>
            )}

            <div className="flex justify-center mt-4 gap-3">
              {isCameraOn ? (
                <>
                  <button
                    onClick={capture}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                  >
                    <Camera size={16} className="inline" /> Capture
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                  >
                    <X size={16} className="inline" /> Stop
                  </button>
                </>
              ) : (
                <button
                  onClick={resumeCamera}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                >
                  <RefreshCcw size={16} className="inline" /> Open Camera
                </button>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="w-full md:w-1/2 text-center space-y-2">
            <p className="text-lg font-semibold text-gray-700">
              Image Preview:
            </p>
            <div className="h-64 rounded-xl overflow-hidden border shadow bg-white flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="object-contain w-full h-full"
                />
              ) : (
                <p className="text-gray-400">No image selected</p>
              )}
            </div>
            {isCotton === false && (
              <p className="text-red-600 mt-2 font-medium">
                🚫 Not a valid cotton image.
              </p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={sendImageToFlask}
            disabled={loading}
            className={`w-full px-6 py-3 font-semibold rounded-xl flex items-center justify-center gap-2 text-white transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <UploadCloud size={18} />
            {loading ? "Checking..." : "Check if Cotton"}
          </button>

          {isCotton && (
            <button
              onClick={sendImageToBackend}
              disabled={!image || loading}
              className={`w-full px-6 py-3 font-semibold rounded-xl flex items-center justify-center gap-2 text-white transition ${
                loading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              <UploadCloud size={18} />
              {loading ? "Analyzing..." : "Detect Disease"}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MainPage;
