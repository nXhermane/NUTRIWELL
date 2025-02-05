import { AggregateID, Repository } from "@shared";
import { FoodUnit } from "../../domain";

export interface FoodUnitRepository extends Repository<FoodUnit> {
   getAllId(): Promise<AggregateID[]>;
   getAllSymbol(): Promise<string[]>;
   getAll(): Promise<FoodUnit[]>;
}
