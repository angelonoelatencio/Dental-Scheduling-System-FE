import { useQuery } from "@tanstack/react-query";
import { IGetDentistBySpecialtyParam } from "../../interface/IDentist";
import { getDentistBySpecialty } from "./getDentistBySpecialty";

export const useGetDentistBySpecialty = (
  queryConfig: IGetDentistBySpecialtyParam
) => {
  return useQuery({
    queryFn: () => getDentistBySpecialty(queryConfig),
    queryKey: ["IGetDentistBySpecialtyParam", queryConfig],
  });
};
