import { AggregateID } from "@shared";
import { QuantityDto } from "../../../dtos";

export type GetFoodForQuantityRequest = {
   foodId: AggregateID;
   quantity: QuantityDto;
};
