import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetFoodByIdRequest } from "./GetFoodByIdRequest";
import { GetFoodByIdResponse } from "./GetFoodByIdResponse";
import { FoodDto } from "../../../dtos";
import { FoodRepository } from "../../../../infrastructure";
import { Food } from "../../../../domain";

export class GetFoodByIdUseCase implements UseCase<GetFoodByIdRequest, GetFoodByIdResponse> {
   constructor(private readonly foodRepo: FoodRepository, private readonly mapper: ApplicationMapper<Food, FoodDto>) {}
   async execute(request: GetFoodByIdRequest): Promise<GetFoodByIdResponse> {
      try {
         const food = await this.foodRepo.getById(request.id);
         const foodDto = this.mapper.toResponse(food);
         return right(Result.ok<FoodDto>(foodDto));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
