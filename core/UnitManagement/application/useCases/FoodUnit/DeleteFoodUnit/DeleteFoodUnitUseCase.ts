import {  handleError, left, Result, right, UseCase } from "@shared";
import { DeleteFoodUnitRequest } from "./DeleteFoodUnitRequest";
import { DeleteFoodUnitResponse } from "./DeleteFoodUnitResponse";
import { FoodUnitRepository } from "../../../../infrastructure";

export class DeleteFoodUnitUseCase implements UseCase<DeleteFoodUnitRequest, DeleteFoodUnitResponse> {
   constructor(private foodUnitRepo: FoodUnitRepository) {}
   async execute(request: DeleteFoodUnitRequest): Promise<DeleteFoodUnitResponse> {
      try {
         const foodUnit = await this.foodUnitRepo.getById(request.foodUnitId);
         foodUnit.delete();
         await this.foodUnitRepo.delete(foodUnit.id);
         return right(Result.ok());
      } catch (error) {
         return left(handleError(error));
      }
   }
}
