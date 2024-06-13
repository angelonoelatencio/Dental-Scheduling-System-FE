import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../config/constants/connections";
import { isTokenExpired } from "./jwtTokenHelper";

const useAxios = (): AxiosInstance => {
  const token = localStorage.getItem("t");

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  axiosInstance.interceptors.request.use(
    async (req: any) => {
      return req;
    },
    async function (error) {
      console.log(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      let token_ = localStorage.getItem("t");

      if (isTokenExpired()) {
        if (
          token_ &&
          error?.response?.status === 401 &&
          !originalRequest?._retry
        ) {
          originalRequest._retry = true;
        }
        if (
          token_ &&
          error?.response?.status === 400 &&
          !originalRequest?._retry
        ) {
          originalRequest._retry = true;
          axiosInstance.defaults.headers.common["Authorization"] =
            "Bearer " + token_;
          return axios(originalRequest);
        }

        if (
          token_ &&
          error?.response?.status === 409 &&
          !originalRequest?._retry
        ) {
          originalRequest._retry = true;
          axiosInstance.defaults.headers.common["Authorization"] =
            "Bearer " + token_;
          return axios(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
