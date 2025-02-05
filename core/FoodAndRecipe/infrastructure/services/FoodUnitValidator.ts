import { MeasureUnit } from "@shared";

export interface FoodUnitValidator {
   validate(unit: MeasureUnit): Promise<boolean>;
   getAvailableUnits(): Promise<MeasureUnit[]>;
}
