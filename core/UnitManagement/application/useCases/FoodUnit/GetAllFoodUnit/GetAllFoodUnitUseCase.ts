import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetAllFoodUnitRequest } from "./GetAllFoodUnitRequest";
import { GetAllFoodUnitResponse } from "./GetAllFoodUnitResponse";
import { FoodUnitRepository } from "../../../../infrastructure";
import { FoodUnit } from "../../../../domain";
import { FoodUnitDto } from "../../../dtos";

export class GetAllFoodUnitUseCase implements UseCase<GetAllFoodUnitRequest, GetAllFoodUnitResponse> {
   constructor(private foodUnitRepo: FoodUnitRepository, private mapper: ApplicationMapper<FoodUnit, FoodUnitDto>) {}
   async execute(request: GetAllFoodUnitRequest): Promise<GetAllFoodUnitResponse> {
      try {
         const foodUnits = await this.foodUnitRepo.getAll();
         const foodUnitDtos = foodUnits.map((foodUnit) => this.mapper.toResponse(foodUnit));
         return right(Result.ok<FoodUnitDto[]>(foodUnitDtos));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
