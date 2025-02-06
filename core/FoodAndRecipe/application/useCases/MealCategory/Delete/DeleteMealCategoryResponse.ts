import { Either, ExceptionBase, Result } from "@shared";

export type DeleteMealCategoryResponse = Either<ExceptionBase | any, Result<void>>;
