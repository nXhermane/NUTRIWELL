import { AggregateID, Either, ExceptionBase, Result } from "@shared";

export type GetAllFoodUnitIdAndSymbolResponse = Either<ExceptionBase | any, Result<{ id: AggregateID; symbol: string }[]>>;
