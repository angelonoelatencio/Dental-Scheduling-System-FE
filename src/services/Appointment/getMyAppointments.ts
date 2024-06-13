import { IGetMyAppointmentResponse } from "../../interface/IAppointment";
import useAxios from "../../utils/useAxios";

const api = useAxios();

export const getMyAppointments =
  async (): Promise<IGetMyAppointmentResponse> => {
    const { data } = await api.get("appointment/getMyAppointment");

    return data;
  };
