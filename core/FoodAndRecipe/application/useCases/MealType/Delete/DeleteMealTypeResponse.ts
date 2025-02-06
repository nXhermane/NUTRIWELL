import { Either, ExceptionBase, Result } from "@shared";

export type DeleteMealTypeResponse = Either<ExceptionBase | any, Result<void>>;
