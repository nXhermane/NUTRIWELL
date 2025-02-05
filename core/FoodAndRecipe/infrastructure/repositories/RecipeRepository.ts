import { Repository } from "@shared";
import { Recipe } from "../../domain/aggregates";

export interface RecipeRepository extends Repository<Recipe> {}
