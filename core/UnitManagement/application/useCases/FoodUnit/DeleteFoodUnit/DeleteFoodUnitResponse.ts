import { Either, ExceptionBase, Result } from "@shared";

export type DeleteFoodUnitResponse = Either<ExceptionBase | any, Result<void>>;
