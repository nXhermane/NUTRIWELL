import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetRecipeByIdRequest } from "./GetRecipeByIdRequest";
import { GetRecipeByIdResponse } from "./GetRecipeByIdResponse";
import { RecipeRepository } from "../../../../infrastructure";
import { Recipe } from "../../../../domain";
import { RecipeDto } from "../../../dtos";

export class GetRecipeByIdUseCase implements UseCase<GetRecipeByIdRequest, GetRecipeByIdResponse> {
   constructor(private readonly recipeRepo: RecipeRepository, private readonly mapper: ApplicationMapper<Recipe, RecipeDto>) {}
   async execute(request: GetRecipeByIdRequest): Promise<GetRecipeByIdResponse> {
      try {
         const recipe = await this.recipeRepo.getById(request.id);
         const recipeDto = this.mapper.toResponse(recipe);
         return right(Result.ok<RecipeDto>(recipeDto));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
