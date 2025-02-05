import { MeasureUnit } from "@shared";

export interface FoodUnitManagerALC {
   getFoodAvailableUnit(): Promise<MeasureUnit[]>;
}
