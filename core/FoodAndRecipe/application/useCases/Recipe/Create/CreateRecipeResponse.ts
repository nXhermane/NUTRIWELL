import { AggregateID, Either, ExceptionBase, Result } from "@shared";

export type CreateRecipeResponse = Either<ExceptionBase | any, Result<{ id: AggregateID }>>;
