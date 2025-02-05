import { AggregateID } from "@shared";

export type ConvertFoodUnitRequest = {
   value: number;
   fromUnitIdOrSymbol: AggregateID;
   toUnitIdOrSymbol?: AggregateID;
};
