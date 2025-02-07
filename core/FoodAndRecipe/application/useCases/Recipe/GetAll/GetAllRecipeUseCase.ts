import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetAllRecipeRequest } from "./GetAllRecipeRequest";
import { GetAllRecipeResponse } from "./GetAllRecipeResponse";
import { RecipeRepository } from "../../../../infrastructure";
import { Recipe } from "../../../../domain";
import { RecipeDto } from "../../../dtos";

export class GetAllRecipeUseCase implements UseCase<GetAllRecipeRequest, GetAllRecipeResponse> {
   constructor(private readonly recipeRepo: RecipeRepository, private readonly mapper: ApplicationMapper<Recipe, RecipeDto>) {}
   async execute(request: GetAllRecipeRequest): Promise<GetAllRecipeResponse> {
      try {
         const recipes = await this.recipeRepo.getAll(request.paginated);
         const recipeDtos = recipes.map((recipe) => this.mapper.toResponse(recipe));
         return right(Result.ok<RecipeDto[]>(recipeDtos));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
