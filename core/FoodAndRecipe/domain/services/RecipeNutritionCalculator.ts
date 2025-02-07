import { AggregateID, handleError, Result } from "@shared";
import { Recipe, Food } from "../aggregates";
import { IRecipeNutritionCalculator, RecipeNutritionalValue } from "./interfaces/RecipeNutritionCalculator";
import { NutrientAmount } from "../value-objects";

export class RecipeNutritionCalculator implements IRecipeNutritionCalculator {
   calculateNutritionalValue(recipe: Recipe, ingredientFoods: Map<AggregateID, Food>): Result<RecipeNutritionalValue> {
      try {
         const nutrientValue: { [key: AggregateID]: NutrientAmount } = {};
         const ingredients = recipe.ingredients;

         for (const ingredient of ingredients) {
            const associateFood = ingredientFoods.get(ingredient.foodId);
            if (!associateFood) return Result.fail<RecipeNutritionalValue>("The nutrient don't have an associate food.");
            const nutrientAmounts = associateFood.nutrients;
            for (const nutrientAmount of nutrientAmounts) {
               if (!nutrientValue[nutrientAmount.nutrientId]) {
                  nutrientValue[nutrientAmount.nutrientId] = new NutrientAmount({
                     nutrientId: nutrientAmount.nutrientId,
                     value: nutrientAmount.value,
                  });
               } else {
                  const nutrientAmountPrevValue = nutrientValue[nutrientAmount.nutrientId];
                  nutrientValue[nutrientAmount.nutrientId] = new NutrientAmount({
                     nutrientId: nutrientAmount.nutrientId,
                     value: nutrientAmount.value + nutrientAmountPrevValue.unpack().value,
                  });
               }
            }
         }

         return Result.ok<RecipeNutritionalValue>({
            recipeId: recipe.id,
            nutrientAmounts: Object.values(nutrientValue),
         });
      } catch (e) {
         return handleError(e);
      }
   }
}
