import { handleError, left, Result, right, UseCase } from "@shared";
import { DeleteMealCategoryRequest } from "./DeleteMealCategoryRequest";
import { DeleteMealCategoryResponse } from "./DeleteMealCategoryResponse";
import { MealCategoryRepository } from "../../../../infrastructure";

export class DeleteMealCategoryUseCase implements UseCase<DeleteMealCategoryRequest, DeleteMealCategoryResponse> {
   constructor(private readonly mealCategoryRepo: MealCategoryRepository) {}
   async execute(request: DeleteMealCategoryRequest): Promise<DeleteMealCategoryResponse> {
      try {
         const mealCategory = await this.mealCategoryRepo.getById(request.id);
         mealCategory.delete();
         await this.mealCategoryRepo.delete(request.id);
         return right(Result.ok<void>());
      } catch (error) {
         return left(handleError(error));
      }
   }
}
