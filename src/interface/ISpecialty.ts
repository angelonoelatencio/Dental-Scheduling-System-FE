export interface ISpecialty {
  id?: number;
  name: string;
}

export interface IGetAllSpecialtyResponse {
  message: string;
  count: number;
  specialties: ISpecialty[];
}
