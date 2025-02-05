import { AggregateID, ExceptionBase, Guard, left, Result, right, UseCase } from "@shared";
import { ConvertFoodUnitRequest } from "./ConvertFoodUnitRequest";
import { ConvertFoodUnitResponse } from "./ConvertFoodUnitResponse";
import { FoodUnitRepository } from "../../../../infrastructure";
import { ConvertedValueDto } from "../../../dtos";

export class ConvertFoodUnitUseCase implements UseCase<ConvertFoodUnitRequest, ConvertFoodUnitResponse> {
   constructor( private readonly foodUnitRepo: FoodUnitRepository) {}
   async execute(request: ConvertFoodUnitRequest): Promise<ConvertFoodUnitResponse> {
      try {
         const fromUnit = await this.foodUnitRepo.getById(request.fromUnitIdOrSymbol);
         const toUnit = Guard.isEmpty(request.toUnitIdOrSymbol).succeeded
            ? await this.foodUnitRepo.getBasicUnit()
            : await this.foodUnitRepo.getById(request.toUnitIdOrSymbol as AggregateID);
         const convertedValue = fromUnit.convertTo(toUnit, request.value);
         return right(
            Result.ok<ConvertedValueDto>({
               value: convertedValue,
               fromUnitId: fromUnit.id,
               unitId: toUnit.id,
            }),
         );
      } catch (error) {
         if (error instanceof ExceptionBase) return left(Result.fail<ExceptionBase>(`[${error.code}]:${error.message}`));
         return left(Result.fail<any>(`Unexpected Error : ${error}`));
      }
   }
}
