import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetNutritionistByIdRequest } from "./GetNutritionistByIdRequest";
import { GetNutritionistByIdResponse } from "./GetNutritionistByIdResponse";
import { NutritionistRepository } from "../../../../infrastructure";
import { Nutritionist } from "../../../../domain";
import { NutritionistDto } from "../../../dtos/NutritionistDto";

export class GetNutritionistByIdUseCase implements UseCase<GetNutritionistByIdRequest, GetNutritionistByIdResponse> {
   constructor(
      private readonly nutritionistRepo: NutritionistRepository,
      private readonly mapper: ApplicationMapper<Nutritionist, NutritionistDto>,
   ) {}
   async execute(request: GetNutritionistByIdRequest): Promise<GetNutritionistByIdResponse> {
      try {
         const nutritionist = await this.nutritionistRepo.getById(request.id);
         const nutritionistDto = this.mapper.toResponse(nutritionist);
         return right(Result.ok<NutritionistDto>(nutritionistDto));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
