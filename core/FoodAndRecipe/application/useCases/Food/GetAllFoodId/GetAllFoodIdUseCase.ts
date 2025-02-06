import { AggregateID, ExceptionBase, handleError, left, Result, right, UseCase } from "@shared";
import { GetAllFoodIdRequest } from "./GetAllFoodIdRequest";
import { GetAllFoodIdResponse } from "./GetAllFoodIdResponse";
import { FoodRepository } from "../../../../infrastructure";

export class GetAllFoodIdUseCase implements UseCase<GetAllFoodIdRequest, GetAllFoodIdResponse> {
   constructor(private readonly foodRepo: FoodRepository) {}
   async execute(request: GetAllFoodIdRequest): Promise<GetAllFoodIdResponse> {
      try {
         const foodIds = await this.foodRepo.getAllId();
         return right(Result.ok<AggregateID[]>(foodIds));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
