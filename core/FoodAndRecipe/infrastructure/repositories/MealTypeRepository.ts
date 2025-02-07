import { Paginated, Repository } from "@shared";
import { MealType } from "../../domain/entities";

export interface MealTypeRepository extends Repository<MealType> {
   getAll(paginated: Paginated): Promise<MealType[]>;
}
