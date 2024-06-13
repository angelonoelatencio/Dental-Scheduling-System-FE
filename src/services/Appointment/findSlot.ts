import {
  IFindSlotParam,
  IFindSlotResponse,
} from "../../interface/IAppointment";
import useAxios from "../../utils/useAxios";

const api = useAxios();

export const findSlot = async (
  param: IFindSlotParam
): Promise<IFindSlotResponse> => {
  const { data } = await api.get("appointment/findSlot", {
    params: param,
  });
  return data;
};
