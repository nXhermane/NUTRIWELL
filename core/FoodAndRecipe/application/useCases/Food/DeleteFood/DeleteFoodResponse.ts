import { Either, ExceptionBase, Result } from "@shared";

export type DeleteFoodResponse = Either<ExceptionBase | any, Result<void>>;
