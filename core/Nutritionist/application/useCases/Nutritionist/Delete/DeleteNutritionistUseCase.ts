import { handleError, left, Result, right, UseCase } from "@shared";
import { DeleteNutritionistRequest } from "./DeleteNutritionistRequest";
import { DeleteNutritionistResponse } from "./DeleteNutritionistResponse";
import { NutritionistRepository } from "../../../../infrastructure";

export class DeleteNutritionistUseCase implements UseCase<DeleteNutritionistRequest, DeleteNutritionistResponse> {
   constructor(private readonly nutritionistRepo: NutritionistRepository) {}
   async execute(request: DeleteNutritionistRequest): Promise<DeleteNutritionistResponse> {
      try {
         const nutritionsitResult = await Result.encapsulateAsync(async () => {
            return await this.nutritionistRepo.getById(request.id);
         });
         if (nutritionsitResult.isFailure) return left(nutritionsitResult.err);
         const nutritionist = nutritionsitResult.val;
         nutritionist.delete();
         await this.nutritionistRepo.delete(nutritionist.id);
         return right(Result.ok<void>());
      } catch (error) {
         return left(handleError(error));
      }
   }
}
