import { Either, ExceptionBase, Result } from "@shared";
import { RecipeDto } from "../../../dtos";

export type GetAllRecipeResponse = Either<ExceptionBase | any, Result<RecipeDto[]>>;