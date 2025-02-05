import { AggregateID } from "@shared";

export interface NutrientAmountDto {
   nutrientId: AggregateID;
   value: number;
   originalValue?: string;
}
