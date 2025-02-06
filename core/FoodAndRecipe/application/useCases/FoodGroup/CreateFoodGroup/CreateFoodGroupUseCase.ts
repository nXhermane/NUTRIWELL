import { AggregateID, GenerateUniqueId, handleError, left, Result, right, UseCase } from "@shared";
import { CreateFoodGroupRequest } from "./CreateFoodGroupRequest";
import { CreateFoodGroupResponse } from "./CreateFoodGroupResponse";
import { FoodGroupRepository } from "../../../../infrastructure";
import { FoodGroup } from "../../../../domain";

export class CreateFoodGroupUseCase implements UseCase<CreateFoodGroupRequest, CreateFoodGroupResponse> {
   constructor(private readonly foodGroupRepo: FoodGroupRepository, private readonly idGenerator: GenerateUniqueId) {}
   async execute(request: CreateFoodGroupRequest): Promise<CreateFoodGroupResponse> {
      try {
         const foodGroupResult = FoodGroup.create(request, this.idGenerator.generate().toValue());
         if (foodGroupResult.isFailure) return left(Result.fail<{ id: AggregateID }>(String(foodGroupResult.err)));
         foodGroupResult.val.created();
         await this.foodGroupRepo.save(foodGroupResult.val);
         return right(Result.ok<{ id: AggregateID }>(foodGroupResult.val));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
