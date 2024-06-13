import { useMutation } from "@tanstack/react-query";
import showNotification from "../../utils/openNotification";
import { createAppointment } from "./createAppointment";
import { IAppointmentCreateResponse } from "../../interface/IAppointment";

export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: createAppointment,

    onSuccess: (response: IAppointmentCreateResponse) => {
      showNotification("success", "Appointment", response?.message);
    },

    onError: (error: any) => {
      showNotification("error", "Appointment", error?.response?.data?.message);
    },
  });
};


