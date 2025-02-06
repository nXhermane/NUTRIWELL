import { AggregateID, ApplicationMapper, ExceptionBase, Guard, Result, left, right, UseCase, handleError } from "@shared";
import { GetFoodUnitByIdOrSymbolRequest } from "./GetFoodUnitByIdOrSymbolRequest";
import { GetFoodUnitByIdOrSymbolResponse } from "./GetFoodUnitByIdOrSymbolResponse";
import { FoodUnitRepository } from "../../../../infrastructure";
import { FoodUnit } from "../../../../domain";
import { FoodUnitDto } from "../../../dtos";

export class GetFoodUnitByIdOrSymbolUseCase implements UseCase<GetFoodUnitByIdOrSymbolRequest, GetFoodUnitByIdOrSymbolResponse> {
   constructor(private foodUnitRepo: FoodUnitRepository, private mapper: ApplicationMapper<FoodUnit, FoodUnitDto>) {}
   async execute(request: GetFoodUnitByIdOrSymbolRequest): Promise<GetFoodUnitByIdOrSymbolResponse> {
      try {
         const foodUnit = Guard.isEmpty(request.foodUnitIdOrSymbol).succeeded
            ? await this.foodUnitRepo.getBasicUnit()
            : await this.foodUnitRepo.getById(request.foodUnitIdOrSymbol as AggregateID);
         const foodUnitDto = this.mapper.toResponse(foodUnit);
         return right(Result.ok<FoodUnitDto>(foodUnitDto));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
