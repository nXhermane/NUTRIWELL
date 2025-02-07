import { ApplicationMapper, handleError, left, MeasureUnit, Result, right, UseCase } from "@shared";
import { GetFoodForQuantityRequest } from "./GetFoodForQuantityRequest";
import { GetFoodForQuantityResponse } from "./GetFoodForQuantityResponse";
import { FoodRepository } from "../../../../infrastructure";
import { FoodDto } from "../../../dtos";
import { Food, FoodQuantity, NutritionalValueScaler } from "../../../../domain";
import { FoodUnitManagerALC } from "../../../ACL";

export class GetFoodForQuantityUseCase implements UseCase<GetFoodForQuantityRequest, GetFoodForQuantityResponse> {
   constructor(
      private readonly foodRepo: FoodRepository,
      private readonly mapper: ApplicationMapper<Food, FoodDto>,
      private readonly foodUnitManagerALC: FoodUnitManagerALC,
   ) {}
   async execute(request: GetFoodForQuantityRequest): Promise<GetFoodForQuantityResponse> {
      try {
         // Get Concern food from Repository
         const food = await this.foodRepo.getById(request.foodId);

         // Convertir la valeur de la newQuantity vers le quantity du food : Meme unite
         const convertedValue = await this.foodUnitManagerALC.convertFoodQuantity({
            value: request.quantity.value,
            unit: request.quantity.unit,
            toUnit: food.quantity.unit.toString(),
         });

         // Create a next Quantity ValueObjecct
         const nextQuantity = new FoodQuantity({ unit: new MeasureUnit(convertedValue.unit as string), value: convertedValue.value });
         const { nutrients, quantity } = food.getProps();
         // Scaling Food NutrientValue by a nextquantity
         const foodNutrientAmountsScalingValue = new NutritionalValueScaler().scale({
            nutrientAmounts: nutrients,
            prevQuantity: quantity,
            nextQuantity,
         });
         //Cheack if this process fail return a failed Result
         if (foodNutrientAmountsScalingValue.isFailure) return left(Result.fail<FoodDto>(String(foodNutrientAmountsScalingValue.err)));
         // Convert food to FoodDto
         const foodDto = this.mapper.toResponse(food);
         // set Quantity On Dto
         foodDto.quantity = request.quantity;
         // map nutrientAmount value to NutrientAmountDto and asign it to foodDto nutrients
         foodDto.nutrients = foodNutrientAmountsScalingValue.val.nutrientAmounts.map((nutrientAmount) => nutrientAmount.unpack());
         return right(Result.ok<FoodDto>(foodDto));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
