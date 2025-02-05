import { AggregateID } from "@shared";
import { FoodUnitDto } from "./dtos";

export interface IUnitManagementAPI {
   getAllFoodUnitId(): Promise<AggregateID>;
   getFoodUnitById(): Promise<FoodUnitDto[]>;
   getAllFoodUnit(): Promise<FoodUnitDto[]>;
}
