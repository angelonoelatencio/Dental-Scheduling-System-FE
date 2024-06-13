import { IGetAllSpecialtyResponse } from "../../interface/ISpecialty";
import useAxios from "../../utils/useAxios";

const api = useAxios();

export const getAllSpecialty = async (): Promise<IGetAllSpecialtyResponse> => {
  const { data } = await api.get("specialty/all");

  return data;
};
