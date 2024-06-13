export interface IGetDentistBySpecialtyParam {
  specialtyId: number;
}
export interface IAvailableDentistPerSpecialty {
  dentist_id: number;
  dentist_name: string;
  specialty_id: number;
  specialty_name: string;
}

export interface IGetDentistBySpecialtyResponse {
  message: string;
  count?: number;
  dentists?: IAvailableDentistPerSpecialty[];
}
