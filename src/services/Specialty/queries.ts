import { useQuery } from "@tanstack/react-query";
import { getAllSpecialty } from "./getAllSpecialty";

export const useGetBySpecialty = () => {
  return useQuery({
    queryFn: getAllSpecialty,
    queryKey: ["getAllSpecialty"],
  });
};
