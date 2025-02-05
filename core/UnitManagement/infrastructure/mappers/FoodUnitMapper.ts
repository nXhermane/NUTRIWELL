import { InfrastructureMapper } from "@shared";
import { FoodUnit } from "../../domain";

export interface FoodUnitInfraMapper<PersitenceType extends Object> extends InfrastructureMapper<FoodUnit, PersitenceType> {}
