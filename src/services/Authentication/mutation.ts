import { useMutation } from "@tanstack/react-query";
import { login } from "./login";
import { ILoginResponse } from "../../interface/ILogin";
import showNotification from "../../utils/openNotification";
import { useNavigate } from "react-router-dom";
import { registration } from "./registration";

export const useLoginUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,

    onSuccess: (response: ILoginResponse) => {
      console.log(response);
      localStorage.setItem("t", response?.token);

      showNotification("success", "Login", response?.message);
      navigate("/appointment");
    },

    onError: (error: any) => {
      console.log(error?.response?.data?.message);
      showNotification("error", "Login", error?.response?.data?.message);
    },
  });
};

export const useRegisterUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registration,

    onSuccess: (response: ILoginResponse) => {

      showNotification("success", "Registration", response?.message);
      navigate("/login");
    },

    onError: (error: any) => {
      showNotification("error", "Registration", error?.response?.data?.message);
    },
  });
};
