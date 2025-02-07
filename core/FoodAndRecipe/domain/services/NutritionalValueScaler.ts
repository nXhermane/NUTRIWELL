import { handleError, Result } from "@shared";
import { NutrientAmount } from "../value-objects";
import { INutritionalValueScaler, NutritionalValueScalerParams, NutritionalValueScalerResponse } from "./interfaces/NutritionalValueScaler";

export class NutritionalValueScaler implements INutritionalValueScaler {
   scale(params: NutritionalValueScalerParams): Result<NutritionalValueScalerResponse> {
      try {
         // Verifier si les deux quantites precedent la meme unite
         if (params.nextQuantity.unpack().unit.toString() != params.prevQuantity.unpack().unit.toString())
            return Result.fail<NutritionalValueScalerResponse>(
               "The Scaling of nutritional value needs , the prev quantity must have a same unit with the next quantity.",
            );
         //Scaler la valeur des nutrients amounts vers la nouvelle quantity
         // NutrientAmountPrevValue ----> PrevQuantityValue
         // NutrientAmountNewValue  ----> NextQuantityValue
         // NutrientAmountNewValue = (NutrientAmountPrevValue * NextQuantityValue)/ PrevQuantityValue
         const nextNutrientAmounts = params.nutrientAmounts.map(
            (nutrientAmount) =>
               new NutrientAmount({
                  value: (nutrientAmount.unpack().value * params.nextQuantity.unpack().value) / params.prevQuantity.unpack().value,
                  nutrientId: nutrientAmount.unpack().nutrientId,
               }),
         );
         return Result.ok<NutritionalValueScalerResponse>({
            nutrientAmounts: nextNutrientAmounts,
            quantity: params.nextQuantity,
         });
      } catch (error) {
         return handleError(error);
      }
   }
}
