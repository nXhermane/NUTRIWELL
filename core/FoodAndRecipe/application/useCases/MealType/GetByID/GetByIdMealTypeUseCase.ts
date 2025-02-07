import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetByIdMealTypeRequest } from "./GetByIdMealTypeRequest";
import { GetByIdMealTypeResponse } from "./GetByIdMealTypeResponse";
import { MealTypeRepository } from "../../../../infrastructure";
import { MealType } from "../../../../domain";
import { MealTypeDto } from "../../../dtos";

export class GetByIdMealTypeUseCase implements UseCase<GetByIdMealTypeRequest, GetByIdMealTypeResponse> {
   constructor(private readonly mealTypeRepo: MealTypeRepository, private readonly mapper: ApplicationMapper<MealType, MealTypeDto>) {}
   async execute(request: GetByIdMealTypeRequest): Promise<GetByIdMealTypeResponse> {
      try {
         const mealType = await this.mealTypeRepo.getById(request.id);
         const mealTypeDto = this.mapper.toResponse(mealType);
         return right(Result.ok<MealTypeDto>(mealTypeDto));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
