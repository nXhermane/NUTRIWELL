import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetByIdMealCategoryRequest } from "./GetByIdMealCategoryRequest";
import { GetByIdMealCategoryResponse } from "./GetByIdMealCategoryResponse";
import { MealCategoryRepository } from "../../../../infrastructure";
import { MealCategory } from "../../../../domain";
import { MealCategoryDto } from "../../../dtos";

export class GetByIdMealCategoryUseCase implements UseCase<GetByIdMealCategoryRequest, GetByIdMealCategoryResponse> {
   constructor(
      private readonly mealCategoryRepo: MealCategoryRepository,
      private readonly mapper: ApplicationMapper<MealCategory, MealCategoryDto>,
   ) {}
   async execute(request: GetByIdMealCategoryRequest): Promise<GetByIdMealCategoryResponse> {
      try {
         const mealCategory = await this.mealCategoryRepo.getById(request.id);
         const mealCategoryDto = this.mapper.toResponse(mealCategory);
         return right(Result.ok<MealCategoryDto>(mealCategoryDto));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
