import { AggregateID, ExceptionBase, left, Result, right, UseCase } from "@shared";
import { GetAllFoodUnitIdAndSymbolRequest } from "./GetAllFoodUnitIdAndSymbolRequest";
import { GetAllFoodUnitIdAndSymbolResponse } from "./GetAllFoodUnitIdAndSymbolResponse";
import { FoodUnitRepository } from "../../../../infrastructure";

export class GetAllFoodUnitIdUseCase implements UseCase<GetAllFoodUnitIdAndSymbolRequest, GetAllFoodUnitIdAndSymbolResponse> {
   constructor(private foodUnitRepo: FoodUnitRepository) {}
   async execute(request: GetAllFoodUnitIdAndSymbolRequest): Promise<GetAllFoodUnitIdAndSymbolResponse> {
      try {
         const foodUnitIds = await this.foodUnitRepo.getAllIdAndSymbol();
         return right(Result.ok<{ id: AggregateID; symbol: string }[]>(foodUnitIds));
      } catch (error) {
         if (error instanceof ExceptionBase) return left(Result.fail<ExceptionBase>(`[${error.code}]:${error.message}`));
         return left(Result.fail<any>(`Unexpected Error : ${error}`));
      }
   }
}
