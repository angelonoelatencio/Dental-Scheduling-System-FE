import {
  IGetDentistBySpecialtyParam,
  IGetDentistBySpecialtyResponse,
} from "../../interface/IDentist";
import useAxios from "../../utils/useAxios";

const api = useAxios();

export const getDentistBySpecialty = async (
  param: IGetDentistBySpecialtyParam
): Promise<IGetDentistBySpecialtyResponse> => {
  const { data } = await api.get("dentist/getAllDentistsPerSpecialty/", {
    params: param,
  });
  return data;
};
