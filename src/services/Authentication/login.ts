import axios from "axios";
import { baseUrl } from "../../config/constants/connections";
import { ILoginParam, ILoginResponse } from "../../interface/ILogin";

const authApi = axios.create({
  baseURL: baseUrl,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const login = async (user: ILoginParam): Promise<ILoginResponse> => {
  const { data } = await authApi.post(`auth/login`, user);

  return data;
};
