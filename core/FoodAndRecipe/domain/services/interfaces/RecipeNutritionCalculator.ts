import { AggregateID, Result } from "@shared";
import { Food, Recipe } from "../../aggregates";
import { NutrientAmount } from "../../value-objects";

export type RecipeNutritionalValue = {
   recipeId: AggregateID;
   nutrientAmounts: NutrientAmount[];
};
export interface IRecipeNutritionCalculator {
   calculateNutritionalValue(recipe: Recipe, ingredientFoods: Map<AggregateID, Food>): Result<RecipeNutritionalValue>;
}
