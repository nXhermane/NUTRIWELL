import { AggregateID } from "@shared";
import { IMealType, IMealCategory, IIngredient, IPreparationStep, CreateFoodQuantityProps } from "../../../../domain";

export type CreateRecipeRequest = {
   name: string;
   type: IMealType | AggregateID;
   category: IMealCategory | AggregateID;
   ingredients: IIngredient[];
   preparationMethod: IPreparationStep[];
   cookingTime: number;
   quantity: CreateFoodQuantityProps;
   description: string;
   author: string;
   translate: { [langcode: string]: string };
   isSystemRecipe: boolean;
};
