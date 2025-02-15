import { AggregateID } from "@shared";
import { IFoodItem } from "../value-objects/FoodItem";

export interface CreateMealProps {
   mealType: AggregateID;
   consumptionTime: string;
   foodItems: IFoodItem[];
   notes: string;
}
