import { AggregateID, MeasureUnit } from "@shared";

export type FoodQuantityConversionDto = {
   value: number;
   unit: AggregateID;
   toUnit: AggregateID;
};
export type FoodConvertedQuantityDto = {
   value: number;
   fromUnit: AggregateID;
   unit: AggregateID;
};
export interface FoodUnitManagerALC {
   getFoodAvailableUnit(): Promise<MeasureUnit[]>;
   convertFoodQuantity(foodQuantity: FoodQuantityConversionDto): Promise<FoodConvertedQuantityDto>;
}
