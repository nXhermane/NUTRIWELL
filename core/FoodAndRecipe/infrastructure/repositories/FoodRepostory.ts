import { AggregateID, Paginated, Repository } from "@shared";
import { Food } from "../../domain/aggregates";

export interface FoodRepository extends Repository<Food> {
   getAllId(): Promise<AggregateID[]>;
   getAll(paginated: Paginated): Promise<Food[]>;
}
