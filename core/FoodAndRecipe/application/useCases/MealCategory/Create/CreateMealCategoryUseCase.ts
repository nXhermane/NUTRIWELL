import { AggregateID, GenerateUniqueId, handleError, left, Result, right, UseCase } from "@shared";
import { CreateMealCategoryRequest } from "./CreateMealCategoryRequest";
import { CreateMealCategoryResponse } from "./CreateMealCaterogyResponse";
import { MealCategoryRepository } from "../../../../infrastructure";
import { MealCategory } from "../../../../domain";

export class CreateMealCategoryUseCase implements UseCase<CreateMealCategoryRequest, CreateMealCategoryResponse> {
   constructor(private readonly mealCategoryRepo: MealCategoryRepository, private readonly idGenerator: GenerateUniqueId) {}
   async execute(request: CreateMealCategoryRequest): Promise<CreateMealCategoryResponse> {
      try {
         const mealCategoryResult = MealCategory.create(request, this.idGenerator.generate().toValue());
         if (mealCategoryResult.isFailure) return left(Result.fail<{ id: AggregateID }>(String(mealCategoryResult.err)));
         mealCategoryResult.val.created();
         await this.mealCategoryRepo.save(mealCategoryResult.val);
         return right(Result.ok<{ id: AggregateID }>({ id: mealCategoryResult.val.id }));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
