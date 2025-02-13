import { AggregateID, Either, ExceptionBase, Result } from "@shared";

export type CreatePatientResponse = Either<ExceptionBase | any, Result<{ id: AggregateID }>>;
