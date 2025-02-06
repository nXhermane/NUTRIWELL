import { AggregateID, GenerateUniqueId, handleError, left, Result, right, UseCase } from "@shared";
import { CreateMealTypeRequest } from "./CreateMealTypeRequest";
import { CreateMealTypeResponse } from "./CreateMealTypeResponse";
import { MealTypeRepository } from "../../../../infrastructure";
import { MealType } from "../../../../domain";

export class CreateMealTypeUseCase implements UseCase<CreateMealTypeRequest, CreateMealTypeResponse> {
   constructor(private readonly mealTypeRepo: MealTypeRepository, private readonly idGenerator: GenerateUniqueId) {}
   async execute(request: CreateMealTypeRequest): Promise<CreateMealTypeResponse> {
      try {
         const mealTypeResult = MealType.create(request, this.idGenerator.generate().toValue());
         if (mealTypeResult.isFailure) return left(Result.fail<{ id: AggregateID }>(String(mealTypeResult.err)));
         mealTypeResult.val.created();
         await this.mealTypeRepo.save(mealTypeResult.val);
         return right(Result.ok<{ id: AggregateID }>(mealTypeResult.val));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
