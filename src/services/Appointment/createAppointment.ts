import {
  IAppointmentCreateParam,
  IAppointmentCreateResponse,
} from "../../interface/IAppointment";
import useAxios from "../../utils/useAxios";

const api = useAxios();

export const createAppointment = async (
  appointment: IAppointmentCreateParam
): Promise<IAppointmentCreateResponse> => {
  const { data } = await api.post("appointment/create", appointment);
  return data;
};
