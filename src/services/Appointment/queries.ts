import { useQuery } from "@tanstack/react-query";
import { findSlot } from "./findSlot";
import { IFindSlotParam } from "../../interface/IAppointment";
import { getMyAppointments } from "./getMyAppointments";

export const useFindSlot = (queryConfig: IFindSlotParam) => {
  return useQuery({
    queryFn: () => findSlot(queryConfig),
    queryKey: ["IFindSlotParam", queryConfig],
  });
};

export const useGetMyAppointments = () => {
  return useQuery({
    queryFn: getMyAppointments,
    queryKey: ["getMyAppointments"],
  });
};
