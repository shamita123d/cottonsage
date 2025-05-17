export const sendImageToPredictAPI = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://192.168.161.26:5001/predict", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to get prediction");
    }

    const data = await response.json();

    const resultText = data.result;
    console.log("🔍 Prediction Result:", resultText);

    return resultText;
  } catch (error) {
    console.error("❌ Error:", error.message);
    return null;
  }
};
