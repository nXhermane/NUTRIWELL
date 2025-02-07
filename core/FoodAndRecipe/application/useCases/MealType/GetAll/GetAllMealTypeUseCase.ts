import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetAllMealTypeRequest } from "./GetAllMealTypeRequest";
import { GetAllMealTypeResponse } from "./GetAllMealTypeResponse";
import { MealTypeRepository } from "../../../../infrastructure";
import { MealType } from "../../../../domain";
import { MealTypeDto } from "../../../dtos";

export class GetAllMealTypeUseCase implements UseCase<GetAllMealTypeRequest, GetAllMealTypeResponse> {
   constructor(private readonly mealTypeRepo: MealTypeRepository, private readonly mapper: ApplicationMapper<MealType, MealTypeDto>) {}
   async execute(request: GetAllMealTypeRequest): Promise<GetAllMealTypeResponse> {
      try {
         const mealTypes = await this.mealTypeRepo.getAll(request.paginated);
         const mealTypeDtos = mealTypes.map((mealType) => this.mapper.toResponse(mealType));
         return right(Result.ok<MealTypeDto[]>(mealTypeDtos));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
