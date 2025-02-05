import { AggregateID, Either, ExceptionBase, Result } from "@shared";

export type CreateFoodGroupResponse = Either<ExceptionBase | any, Result<{ id: AggregateID }>>;
