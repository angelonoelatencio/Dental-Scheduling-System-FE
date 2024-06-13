import axios from "axios";
import { baseUrl } from "../../config/constants/connections";
import { IRegistrationParam } from "../../interface/IAuthentication";

const authApi = axios.create({
  baseURL: baseUrl,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const registration = async (user: IRegistrationParam) => {
  const { data } = await authApi.post(`auth/register`, user);

  return data;
};
