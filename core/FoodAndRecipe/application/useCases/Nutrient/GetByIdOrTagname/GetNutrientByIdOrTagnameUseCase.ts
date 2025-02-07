import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetNutrientByIdOrTagnameRequest } from "./GetNutrientByIdOrTagnameRequest";
import { GetNutrientByIdOrTagnameResponse } from "./GetNutrientByIdOrTagnameResponse";
import { NutrientRepository } from "../../../../infrastructure";
import { Nutrient } from "../../../../domain";
import { NutrientDto } from "../../../dtos";

export class GetNutrientByIdOrTagnameUseCase implements UseCase<GetNutrientByIdOrTagnameRequest, GetNutrientByIdOrTagnameResponse> {
   constructor(private readonly nutrientRepo: NutrientRepository, private readonly mapper: ApplicationMapper<Nutrient, NutrientDto>) {}
   async execute(request: GetNutrientByIdOrTagnameRequest): Promise<GetNutrientByIdOrTagnameResponse> {
      try {
         const nutrient = await this.nutrientRepo.getByIdOrTagname(request.idOrTagname);
         const nutrientDto = this.mapper.toResponse(nutrient);
         return right(Result.ok<NutrientDto>(nutrientDto));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
