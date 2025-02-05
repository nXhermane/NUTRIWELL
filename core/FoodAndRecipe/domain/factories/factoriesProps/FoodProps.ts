import { AggregateID } from "@shared";
import { IFoodGroup } from "../../entities";
import { CreateFoodQuantityProps, INutrientAmount } from "../../value-objects";

export interface CreateFoodProps {
   name: string;
   code: string;
   origin: string;
   source: string;
   quantity: CreateFoodQuantityProps;
   group: IFoodGroup | AggregateID;
   nutrients: INutrientAmount[];
   translate: { [langcode: string]: string };
   isSytemFood: boolean;
}
