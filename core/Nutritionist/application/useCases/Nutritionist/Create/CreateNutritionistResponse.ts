import { AggregateID, Either, Result } from "@shared";
import { ExceptionBase } from "domain-eventrix";

export type CreateNutritionistResponse = Either<ExceptionBase | any, Result<{ id: AggregateID }>>;
