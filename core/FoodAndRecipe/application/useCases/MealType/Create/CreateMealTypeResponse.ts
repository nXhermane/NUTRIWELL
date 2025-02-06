import { AggregateID, Either, ExceptionBase, Result } from "@shared";

export type CreateMealTypeResponse = Either<ExceptionBase | any, Result<{ id: AggregateID }>>;
