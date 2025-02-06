import { AggregateID, Either, ExceptionBase, Result } from "@shared";

export type CreateMealCategoryResponse = Either<ExceptionBase | any, Result<{ id: AggregateID }>>;
