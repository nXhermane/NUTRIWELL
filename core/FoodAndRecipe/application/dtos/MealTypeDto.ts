import { AggregateID } from "@shared";

export interface MealTypeDto {
   id: AggregateID;
   name: string;
   code: string;
   translate: { [lang: string]: string };
   isSystemType: boolean;
}
