import { Paginated, Repository } from "@shared";
import { Recipe } from "../../domain/aggregates";

export interface RecipeRepository extends Repository<Recipe> {
   getAll(paginated: Paginated): Promise<Recipe[]>;
}
