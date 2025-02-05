import { AggregateID } from "@shared";
import { IngredientDto } from "./IngredientDto";
import { PreparationStepDto } from "./PreparationStepDto";
import { QuantityDto } from "./QuantityDto";

export interface RecipeDto {
   id: AggregateID;
   typeId: AggregateID;
   categoryId: AggregateID;
   name: string;
   ingredients: IngredientDto[];
   preparationStep: PreparationStepDto[];
   cookingTime: number;
   quantity: QuantityDto;
   description: string;
   author: string;
   translate: { [langcode: string]: string };
   isSystemRecipe: boolean;
}
