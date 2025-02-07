import { AggregateID, Paginated, Repository } from "@shared";
import { Nutrient } from "../../domain/entities";

export interface NutrientRepository extends Omit<Repository<Nutrient>, "getById"> {
   getAllId(): Promise<AggregateID[]>;
   getByIdOrTagname(idOrTagname: AggregateID | string): Promise<Nutrient>;
   getAll(paginated: Paginated): Promise<Nutrient[]>;
}
