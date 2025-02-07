import { handleError, left, Result, right, UseCase } from "@shared";
import { GetRecipeNutritionalvalueRequest } from "./GetRecipeNutritionalValueRequest";
import { GetRecipeNutritionalvalueResponse } from "./GetRecipeNutritionalValueResponse";
import { FoodRepository, RecipeRepository } from "../../../../infrastructure";
import { RecipeNutritionCalculator } from "../../../../domain";
import { RecipeNutritionalValueDto } from "../../../dtos";

export class GetRecipeNutritionalvalueUseCase implements UseCase<GetRecipeNutritionalvalueRequest, GetRecipeNutritionalvalueResponse> {
   constructor(private readonly recipeRepo: RecipeRepository, private readonly foodRepo: FoodRepository) {}
   async execute(request: GetRecipeNutritionalvalueRequest): Promise<GetRecipeNutritionalvalueResponse> {
      try {
         const recipe = await this.recipeRepo.getById(request.recipeId);
         const recipeNutrionCalculator = new RecipeNutritionCalculator();
         const recipeIngredientFoods = await Promise.all(recipe.ingredients.map((ingredient) => this.foodRepo.getById(ingredient.foodId)));
         const recipeNutritionalValueResult = recipeNutrionCalculator.calculateNutritionalValue(
            recipe,
            new Map(recipeIngredientFoods.map((recipeIngredientFood) => [recipeIngredientFood.id, recipeIngredientFood])),
         );
         if (recipeNutritionalValueResult.isFailure) return left(Result.fail<RecipeNutritionalValueDto>(String(recipeNutritionalValueResult.err)));
         return right(
            Result.ok<RecipeNutritionalValueDto>({
               id: recipeNutritionalValueResult.val.recipeId,
               nutrients: recipeNutritionalValueResult.val.nutrientAmounts.map((nutrientAmount) => nutrientAmount.unpack()),
            }),
         );
      } catch (error) {
         return left(handleError(error));
      }
   }
}
