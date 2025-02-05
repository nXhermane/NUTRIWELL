import { AggregateID } from "@shared";

export interface FoodUnitDto {
   id: AggregateID;
   createdAt: string;
   updatedAt: string;
   name: string;
   symbol: string;
   category: "weight" | "volume" | "piece";
   conversionFactor: number;
   requiresDensity: boolean;
}
