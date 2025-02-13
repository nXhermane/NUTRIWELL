import { IAddress } from "@shared";

export interface CreatePatientProps {
   name: string;
   birthday: string;
   gender: "M" | "F" | "O";
   contact: {
      email: string;
      phone: string;
   };
   address: IAddress;
   occupation?: string;
}
