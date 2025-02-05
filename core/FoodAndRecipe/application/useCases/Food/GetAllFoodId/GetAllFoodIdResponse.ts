import { AggregateID, Either, ExceptionBase, Result } from "@shared";

export type GetAllFoodIdResponse = Either<ExceptionBase | any, Result<AggregateID[]>>;
