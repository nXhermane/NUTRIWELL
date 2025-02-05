import { AggregateID, Repository } from "@shared";
import { FoodGroup } from "../../domain/entities";

export interface FoodGroupRepository extends Repository<FoodGroup> {
   getAllId(): Promise<AggregateID[]>;
}
