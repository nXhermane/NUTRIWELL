import { AggregateID } from "@shared";

export interface PatientDto {
   id: AggregateID;
   name: string;
   gender: "M" | "F" | "O";
   contact: { email: string; phoneNumber: string };
   address: {
      street?: string;
      city?: string;
      postalCode?: string;
      country: string;
   };
   birthday: string;
   occupation?: string;
   createdAt: string;
   updatedAt: string;
}
