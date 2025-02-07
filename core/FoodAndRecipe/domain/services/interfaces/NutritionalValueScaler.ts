import { Result } from "@shared";
import { FoodQuantity, NutrientAmount } from "../../value-objects";
export type NutritionalValueScalerParams = {
   nutrientAmounts: NutrientAmount[];
   prevQuantity: FoodQuantity;
   nextQuantity: FoodQuantity;
};
export type NutritionalValueScalerResponse = {
   nutrientAmounts: NutrientAmount[];
   quantity: FoodQuantity;
};
export interface INutritionalValueScaler {
   scale(params: NutritionalValueScalerParams): Result<NutritionalValueScalerResponse>;
}
