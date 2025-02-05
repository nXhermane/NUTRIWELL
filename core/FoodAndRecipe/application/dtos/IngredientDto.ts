import { AggregateID } from "@shared";
import { QuantityDto } from "./QuantityDto";

export interface IngredientDto {
   foodId: AggregateID;
   quantity: QuantityDto;
   name: string;
}
