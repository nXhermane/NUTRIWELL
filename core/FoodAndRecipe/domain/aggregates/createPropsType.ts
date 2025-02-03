import { FoodGroup, MealCategory, MealType } from "../entities";
import { FoodQuantity, Ingredient, NutrientAmount, PreparationStep } from "../value-objects";

export interface CreateFoodProps {
   name: string;
   code: string;
   origin: string;
   source: string;
   quantity: FoodQuantity;
   group: FoodGroup;
   nutrients: NutrientAmount[];
   translate: { [langcode: string]: string };
   isSytemFood: boolean;
}
export interface CreateRecipeProps {
      name: string;
      type: MealType;
      category: MealCategory;
      ingredients: Ingredient[];
      preparationMethod: PreparationStep[];
      /**
       *  @property The cooking time in minutes
       */
      cookingTime: number;
      quantity: FoodQuantity;
      description: string;
      author: string;
      translate: { [langcode: string]: string };
      isSystemRecipe: boolean;
}