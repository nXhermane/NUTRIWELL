import { Either, ExceptionBase, Result } from "@shared";
import { RecipeNutritionalValueDto } from "../../../dtos";

export type GetRecipeNutritionalvalueResponse = Either<ExceptionBase | any, Result<RecipeNutritionalValueDto>>;
