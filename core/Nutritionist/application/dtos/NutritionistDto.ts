import { AggregateID } from "@shared";
import { ConsultationPlaceDto } from "./ConsultationPlaceDto";
import { NutritionAreaOfExpertiseDto } from "./NutritionAreaOfExpertiseDto";

export interface NutritionistDto {
   id: AggregateID;
   name: string;
   email: string;
   contact: { email: string; phoneNumber: string };
   address: { street?: string; city?: string; postalCode?: string; country: string };
   birthday: string;
   gender: "M" | "F" | "O";
   nutritionAreaOfExpertises: NutritionAreaOfExpertiseDto[];
   consultationPlaces: ConsultationPlaceDto[];
   createdAt: string;
   updatedAt: string;
}
