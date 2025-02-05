import { AggregateID, Repository } from "@shared";
import { Nutrient } from "../../domain/entities";

export interface NutrientRepository extends Repository<Nutrient> {
   getAllId(): Promise<AggregateID[]>;
}
