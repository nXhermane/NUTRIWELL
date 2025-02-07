import { Either, ExceptionBase, Result } from "@shared";

export type DeleteRecipeResponse = Either<ExceptionBase | any, Result<void>>;
