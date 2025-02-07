import { AggregateID, Either, ExceptionBase, Result } from "@shared";

export type CreateNutrientResponse = Either<ExceptionBase | any, Result<{ id: AggregateID }>>;
