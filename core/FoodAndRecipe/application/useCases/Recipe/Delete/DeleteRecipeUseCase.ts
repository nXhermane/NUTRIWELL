import { handleError, left, Result, right, UseCase } from "@shared";
import { DeleteRecipeRequest } from "./DeleteRecipeRequest";
import { DeleteRecipeResponse } from "./DeleteRecipeResponse";
import { RecipeRepository } from "../../../../infrastructure";

export class DeleteRecipeUseCase implements UseCase<DeleteRecipeRequest, DeleteRecipeResponse> {
   constructor(private readonly recipeRepo: RecipeRepository) {}
   async execute(request: DeleteRecipeRequest): Promise<DeleteRecipeResponse> {
      try {
         const recipe = await this.recipeRepo.getById(request.id);
         recipe.delete();
         await this.recipeRepo.delete(request.id);
         return right(Result.ok<void>());
      } catch (error) {
         return left(handleError(error));
      }
   }
}
