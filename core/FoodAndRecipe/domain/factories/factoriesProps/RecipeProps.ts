import { AggregateID } from "@shared";
import { IMealCategory, IMealType } from "../../entities";
import { CreateFoodQuantityProps, IIngredient, IPreparationStep } from "../../value-objects";

export interface CreateRecipeProps {
   name: string;
   type: IMealType | AggregateID;
   category: IMealCategory | AggregateID;
   ingredients: IIngredient[];
   preparationMethod: IPreparationStep[];
   /**
    *  @property The cooking time in minutes
    */
   cookingTime: number;
   quantity: CreateFoodQuantityProps;
   description: string;
   author: string;
   translate: { [langcode: string]: string };
   isSystemRecipe: boolean;
}
