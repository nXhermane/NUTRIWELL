import { AggregateID } from "@shared";

export interface MealCategoryDto {
   id: AggregateID;
   name: string;
   code: string;
   translate: { [lang: string]: string };
   isSystemCategory: boolean;
}
