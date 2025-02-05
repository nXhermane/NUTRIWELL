import { AggregateID, Repository } from "@shared";
import { FoodUnit } from "../../domain";

export interface FoodUnitRepository extends Repository<FoodUnit> {
   getAllIdAndSymbol(): Promise<{ id: AggregateID; symbol: string }[]>;
   getAll(): Promise<FoodUnit[]>;
   getBasicUnit(): Promise<FoodUnit>;
}
