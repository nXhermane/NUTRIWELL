import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetFoodGroupByIdRequest } from "./GetFoodGroupByIdReponse";
import { GetFoodGroupByIdResponse } from "./GetFoodGroupByIdRequest";
import { FoodGroupRepository } from "../../../../infrastructure";
import { FoodGroup } from "../../../../domain";
import { FoodGroupDto } from "../../../dtos";

export class GetFoodGroupByIdUseCase implements UseCase<GetFoodGroupByIdRequest, GetFoodGroupByIdResponse> {
   constructor(private readonly foodGroupRepo: FoodGroupRepository, private readonly mapper: ApplicationMapper<FoodGroup, FoodGroupDto>) {}
   async execute(request: GetFoodGroupByIdRequest): Promise<GetFoodGroupByIdResponse> {
      try {
         const foodGroup = await this.foodGroupRepo.getById(request.id);
         const foodGroupDto = this.mapper.toResponse(foodGroup);
         return right(Result.ok<FoodGroupDto>(foodGroupDto));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
