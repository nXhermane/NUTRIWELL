import { Either, ExceptionBase, Result } from "@shared";

export type CreateFoodUnitResponse = Either<ExceptionBase | any, Result<void>>