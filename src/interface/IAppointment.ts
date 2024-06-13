export interface IAppointmentCreateParam {
  dentistId: number;
  appointmentDT: string;
}
export interface IAppointmentCreateResponse {
  message: string;
}
export interface IFindSlotParam {
  dentistId: number;
  appointmentDT: string;
}
export interface IFindSlotResponse {
  message: string;
  count: number;
  slots: string[];
}
export interface IAppointmentListDetails {
  appointment_id: number;
  appointment_time: Date;
  status: string;
  dentist_id: number;
  dentist_name: string;
  specialty_id: number;
  specialty_name: string;
}
export interface IGetMyAppointmentResponse {
  message: string;
  count: number;
  appointments: IAppointmentListDetails[];
}
