import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetAllNutritionistRequest } from "./GetAllNutritionistRequest";
import { GetAllNutritionistResponse } from "./GetAllNutritionistResponse";
import { NutritionistRepository } from "../../../../infrastructure";
import { Nutritionist } from "../../../../domain";
import { NutritionistDto } from "../../../dtos/NutritionistDto";

export class GetAllNutritionistUseCase implements UseCase<GetAllNutritionistRequest, GetAllNutritionistResponse> {
   constructor(
      private readonly nutritionistRepo: NutritionistRepository,
      private readonly mapper: ApplicationMapper<Nutritionist, NutritionistDto>,
   ) {}
   async execute(request: GetAllNutritionistRequest): Promise<GetAllNutritionistResponse> {
      try {
         const nutritionists = await this.nutritionistRepo.getAll();
         const nutritionistDtos = nutritionists.map((nutritionist) => this.mapper.toResponse(nutritionist));
         return right(Result.ok<NutritionistDto[]>(nutritionistDtos));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
