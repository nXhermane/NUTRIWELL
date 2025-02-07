import { handleError, left, Result, right, UseCase } from "@shared";
import { DeleteNutrientRequest } from "./DeleteNutrientRequest";
import { DeleteNutrientResponse } from "./DeleteNutrientResponse";
import { NutrientRepository } from "../../../../infrastructure";

export class DeleteNutrientUseCase implements UseCase<DeleteNutrientRequest, DeleteNutrientResponse> {
   constructor(private readonly nutrientRepo: NutrientRepository) {}
   async execute(request: DeleteNutrientRequest): Promise<DeleteNutrientResponse> {
      try {
         const nutrient = await this.nutrientRepo.getByIdOrTagname(request.id);
         nutrient.delete();
         await this.nutrientRepo.delete(nutrient.id);
         return right(Result.ok<void>());
      } catch (error) {
         return left(handleError(error));
      }
   }
}
