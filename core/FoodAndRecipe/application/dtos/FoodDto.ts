import { AggregateID } from "@shared";
import { NutrientAmountDto } from "./NutrientAmountDto";
import { QuantityDto } from "./QuantityDto";

export interface FoodDto {
   id: AggregateID;
   code: string;
   name: string;
   source: string;
   origin: string;
   groupId: string;
   nutrients: NutrientAmountDto[];
   quantity: QuantityDto;
   isSystemFood: boolean;
   translate: { [lang: string]: string };
}
