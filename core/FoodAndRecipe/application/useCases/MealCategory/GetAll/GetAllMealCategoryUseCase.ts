import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetAllMealCategoryRequest } from "./GetAllMealCategoryRequest";
import { GetAllMealCategoryResponse } from "./GetAllMealCategoryResponse";
import { MealCategoryRepository } from "../../../../infrastructure";
import { MealCategory } from "../../../../domain";
import { MealCategoryDto } from "../../../dtos";

export class GetAllMealCategoryseCase implements UseCase<GetAllMealCategoryRequest, GetAllMealCategoryResponse> {
   constructor(
      private readonly mealCategoryRepo: MealCategoryRepository,
      private readonly mapper: ApplicationMapper<MealCategory, MealCategoryDto>,
   ) {}
   async execute(request: GetAllMealCategoryRequest): Promise<GetAllMealCategoryResponse> {
      try {
         const mealCategories = await this.mealCategoryRepo.getAll(request.paginated);
         const mealCategoryDtos = mealCategories.map((mealCategory) => this.mapper.toResponse(mealCategory));
         return right(Result.ok<MealCategoryDto[]>(mealCategoryDtos));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
