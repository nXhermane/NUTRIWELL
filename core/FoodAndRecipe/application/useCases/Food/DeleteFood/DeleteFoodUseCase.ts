import { handleError, left, Result, right, UseCase } from "@shared";
import { DeleteFoodRequest } from "./DeleteFoodRequest";
import { DeleteFoodResponse } from "./DeleteFoodResponse";
import { FoodRepository } from "../../../../infrastructure";

export class DeleteFoodUseCase implements UseCase<DeleteFoodRequest, DeleteFoodResponse> {
   constructor(private readonly foodRepo: FoodRepository) {}
   async execute(request: DeleteFoodRequest): Promise<DeleteFoodResponse> {
      try {
         const food = await this.foodRepo.getById(request.id);
         food.delete();
         await this.foodRepo.delete(request.id);
         return right(Result.ok());
      } catch (error) {
         return left(handleError(error));
      }
   }
}
