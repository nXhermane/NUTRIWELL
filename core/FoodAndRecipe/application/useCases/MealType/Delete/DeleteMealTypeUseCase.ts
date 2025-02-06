import { handleError, left, Result, right, UseCase } from "@shared";
import { DeleteMealTypeRequest } from "./DeleteMealTypeRequest";
import { DeleteMealTypeResponse } from "./DeleteMealTypeResponse";
import { MealTypeRepository } from "../../../../infrastructure";

export class DeleteMealTypeUseCase implements UseCase<DeleteMealTypeRequest, DeleteMealTypeResponse> {
   constructor(private readonly mealTypeRepo: MealTypeRepository) {}
   async execute(request: DeleteMealTypeRequest): Promise<DeleteMealTypeResponse> {
      try {
         const mealType = await this.mealTypeRepo.getById(request.id);
         mealType.delete();
         await this.mealTypeRepo.delete(request.id);
         return right(Result.ok<void>());
      } catch (error) {
         return left(handleError(error));
      }
   }
}
