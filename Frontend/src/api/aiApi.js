import axios from "axios";
import { BASE_URL } from "../constants/config";
import { handleApiError } from "./errorHandler";

const API = axios.create({
  baseURL: BASE_URL,
});

export const askAI = async (query) => {
  try {
    const response = await API.post("/ai-search", { query });

    if (!response.data || !response.data.answer) {
      throw new Error("NO_CONTEXT");
    }

    return response.data.answer;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
