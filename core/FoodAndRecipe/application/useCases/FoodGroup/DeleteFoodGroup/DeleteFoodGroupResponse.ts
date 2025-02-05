import { Either, ExceptionBase, Result } from "@shared";

export type DeleteFoodGroupResponse = Either<ExceptionBase | any, Result<void>>;
