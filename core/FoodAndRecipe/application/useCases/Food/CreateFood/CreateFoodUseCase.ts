import { AggregateID, Factory, handleError, left, Result, right, UseCase } from "@shared";
import { CreateFoodRequest } from "./CreateFoodRequeset";
import { CreateFoodResponse } from "./CreateFoodResponse";
import { CreateFoodProps } from "../../../../domain/factories";
import { FoodRepository } from "../../../../infrastructure";
import { Food } from "../../../../domain/aggregates";

export class CreateFoodUseCase implements UseCase<CreateFoodRequest, CreateFoodResponse> {
   constructor(private foodRepo: FoodRepository, private readonly factory: Factory<CreateFoodProps, Food>) {}
   async execute(request: CreateFoodProps): Promise<CreateFoodResponse> {
      try {
         const foodResult = await this.factory.create(request);
         if (foodResult.isFailure) return left(Result.fail<Food>(String(foodResult.err)));
         foodResult.val.created();
         await this.foodRepo.save(foodResult.val);
         return right(Result.ok<{ id: AggregateID }>({ id: foodResult.val.id }));
      } catch (error) {
        return left(handleError(error))   }
   }
}
