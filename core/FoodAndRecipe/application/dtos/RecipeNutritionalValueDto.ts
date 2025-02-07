import { AggregateID } from "@shared";
import { NutrientAmountDto } from "./NutrientAmountDto";

export interface RecipeNutritionalValueDto {
   id: AggregateID;
   nutrients: NutrientAmountDto[]
}