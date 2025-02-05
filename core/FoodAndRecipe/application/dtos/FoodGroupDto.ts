import { AggregateID } from "@shared";

export interface FoodGroupDto {
   id: AggregateID;
   code: string;
   name: string;
   translate: { [lang: string]: string };
   isSystemGroup: boolean;
}
