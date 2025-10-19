import axios from "axios";

const baseUrl = "https://event-api.dicoding.dev";

export const getAllEvent = async (endpoint: String) => {
    try {
       const response = await axios.get(`${baseUrl}${endpoint}`);
       console.log("Response data:", response.data);
       
       return response.data.listEvents;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export const getDetailEvent = async (endpoint: String) => {
    try {
       const response = await axios.get(`${baseUrl}${endpoint}`);
       return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}