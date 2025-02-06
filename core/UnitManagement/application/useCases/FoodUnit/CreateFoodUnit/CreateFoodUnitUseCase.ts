import { GenerateUniqueId, handleError, left, Result, right, UseCase } from "@shared";
import { CreateFoodUnitRequest } from "./CreateFoodUnitRequest";
import { CreateFoodUnitResponse } from "./CreateFoodUnitResponse";
import { FoodUnitRepository } from "../../../../infrastructure";
import { FoodUnit, IFoodUnit } from "../../../../domain";

export class CreateFoodUnitUseCase implements UseCase<CreateFoodUnitRequest, CreateFoodUnitResponse> {
   constructor(private foodUnitRepo: FoodUnitRepository, private idGenerator: GenerateUniqueId) {}
   async execute(request: CreateFoodUnitRequest): Promise<CreateFoodUnitResponse> {
      try {
         const foodUnitId = this.idGenerator.generate().toValue();
         const foodUnit = FoodUnit.create(request as IFoodUnit, foodUnitId);
         if (foodUnit.isFailure) return left(Result.fail<any>(String(foodUnit.err)));
         await this.foodUnitRepo.save(foodUnit.val);
         return right(Result.ok());
      } catch (error) {
         return left(handleError(error));
      }
   }
}
