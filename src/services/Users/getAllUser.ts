import axios from "axios";
import { baseUrl } from "../../config/constants/connections";

export const getAllUser = async () => {
  const response = await axios.get(baseUrl + "auth/all");
  return response;
};
