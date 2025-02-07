import { Either, ExceptionBase, Result } from "@shared";

export type DeleteNutrientResponse = Either<ExceptionBase | any, Result<void>>;
