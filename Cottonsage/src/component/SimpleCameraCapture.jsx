import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera, RefreshCcw, X } from "lucide-react";
import { motion } from "framer-motion";
import { useDisease } from "../Context/DiseaseContext";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  // const [image, setImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const {setImage, image } = useDisease();

  // Capture image
  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImage(screenshot);
  };

  // Stop webcam
  const stopCamera = () => {
    const stream = webcamRef.current.video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setIsCameraOn(false);
  };

  // Resume webcam
  const resumeCamera = () => {
    setIsCameraOn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#fff3e0] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 w-full max-w-6xl"
      >
        <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
          CottonCare Camera Scanner
        </h2>

        {/* Side-by-side layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Webcam */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-lg border"
          >
            {isCameraOn ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                className="w-full h-80 object-cover"
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center text-gray-500 text-xl bg-gray-200">
                Camera is Off
              </div>
            )}
          </motion.div>

          {/* Captured Image */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 text-center"
          >
            <p className="font-semibold text-gray-700 mb-2 text-lg">
              Captured Image:
            </p>
            <div className="rounded-2xl overflow-hidden border shadow-lg bg-white h-80 flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt="Captured"
                  className="w-full h-full object-contain"
                />
              ) : (
                <p className="text-gray-400">No image captured yet</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={capture}
            disabled={!isCameraOn}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            <Camera size={18} /> Capture
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={stopCamera}
            disabled={!isCameraOn}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-red-700 transition disabled:opacity-50"
          >
            <X size={18} /> Stop
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={resumeCamera}
            disabled={isCameraOn}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition disabled:opacity-50"
          >
            <RefreshCcw size={18} /> Resume
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default WebcamCapture;
