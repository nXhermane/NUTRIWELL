import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetAllNutrientRequest } from "./GetAllNutrientRequest";
import { GetAllNutrientResponse } from "./GetAllNutrientResponse";
import { NutrientRepository } from "../../../../infrastructure";
import { Nutrient } from "../../../../domain";
import { NutrientDto } from "../../../dtos";

export class GetAllNutrientUseCase implements UseCase<GetAllNutrientRequest, GetAllNutrientResponse> {
   constructor(private readonly nutrientRepo: NutrientRepository, private readonly mapper: ApplicationMapper<Nutrient, NutrientDto>) {}
   async execute(request: GetAllNutrientRequest): Promise<GetAllNutrientResponse> {
      try {
         const nutrients = await this.nutrientRepo.getAll(request.paginated);
         const nutrientDtos = nutrients.map((nutrient) => this.mapper.toResponse(nutrient));
         return right(Result.ok<NutrientDto[]>(nutrientDtos));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
