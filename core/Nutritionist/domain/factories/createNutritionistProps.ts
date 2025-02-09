import { IAddress } from "@shared";
import { CreateConsultationPlaceProps, INutritionAreaOfExpertise } from "../value-objects";

export interface CreateNutritionistProps {
   name: string;
   email: string;
   address: IAddress;
   contact: {
      email?: string;
      phomeNumber: string;
   };
   gender: "M" | "F" | "O";
   birthday: string;
   consultationPlace: CreateConsultationPlaceProps[];
   nutritionAreaOfExpertises: INutritionAreaOfExpertise[]
}
