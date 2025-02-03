import { MeasureUnit } from "@shared";

export interface FoodUnitValidator {
  validate(unit: MeasureUnit): boolean;
  getAvailableUnits(): MeasureUnit[];
}
