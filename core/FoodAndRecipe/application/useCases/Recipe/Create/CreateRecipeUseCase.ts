import { AggregateID, handleError, left, Result, right, UseCase } from "@shared";
import { CreateRecipeRequest } from "./CreateRecipeRequest";
import { CreateRecipeResponse } from "./CreateRecipeResponse";
import { RecipeRepository } from "../../../../infrastructure";
import { RecipeFactory } from "../../../../domain";

export class CreateRecipeUseCase implements UseCase<CreateRecipeRequest, CreateRecipeResponse> {
   constructor(private readonly recipeRepo: RecipeRepository, private readonly recipeFactory: RecipeFactory) {}
   async execute(request: CreateRecipeRequest): Promise<CreateRecipeResponse> {
      try {
         const recipeResult = await this.recipeFactory.create(request);
         if (recipeResult.isFailure) return left(Result.fail<{ id: AggregateID }>(String(recipeResult.err)));
         recipeResult.val.created();
         await this.recipeRepo.save(recipeResult.val);
         return right(Result.ok<{ id: AggregateID }>({ id: recipeResult.val.id }));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
