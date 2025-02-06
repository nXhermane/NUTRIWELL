import { Paginated, Repository } from "@shared";
import { MealCategory } from "../../domain/entities";

export interface MealCategoryRepository extends Repository<MealCategory> {
   getAll(paginated: Paginated): Promise<MealCategory[]>;
}
