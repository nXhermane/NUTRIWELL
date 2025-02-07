import { Either, ExceptionBase, Result } from "@shared";
import { RecipeDto } from "../../../dtos";

export type GetRecipeByIdResponse = Either<ExceptionBase | any, Result<RecipeDto>>;
