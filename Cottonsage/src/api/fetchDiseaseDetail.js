import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/disease";

export const fetchDiseaseDetail = async (diseaseName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/info`, {
      params: { diseaseName },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch disease info.";
  }
};
