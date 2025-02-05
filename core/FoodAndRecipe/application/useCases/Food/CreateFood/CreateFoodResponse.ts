import { AggregateID, Either, ExceptionBase, Result } from "@shared";

export type CreateFoodResponse = Either<ExceptionBase | any, Result<{ id: AggregateID }>>;
