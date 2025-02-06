import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetAllFoodGroupResponse } from "./GetAllFoodGroupResponse";
import { GetAllFoodGroupRequest } from "./GetAllFoodGroupRequest";
import { FoodGroupRepository } from "../../../../infrastructure";
import { FoodGroupDto } from "../../../dtos";
import { FoodGroup } from "../../../../domain";

export class GetAllFoodGroupUseCase implements UseCase<GetAllFoodGroupRequest, GetAllFoodGroupResponse> {
   constructor(private readonly foodGroupRepo: FoodGroupRepository, private readonly mapper: ApplicationMapper<FoodGroup, FoodGroupDto>) {}
   async execute(request: GetAllFoodGroupRequest): Promise<GetAllFoodGroupResponse> {
      try {
         const foodGroups = await this.foodGroupRepo.getAll(request.paginated);
         const foodGroupDtos = foodGroups.map((foodGoup) => this.mapper.toResponse(foodGoup));
         return right(Result.ok<FoodGroupDto[]>(foodGroupDtos));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
