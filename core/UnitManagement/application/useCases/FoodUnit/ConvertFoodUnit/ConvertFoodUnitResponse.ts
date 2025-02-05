import { Either, ExceptionBase, Result } from "@shared";
import { ConvertedValueDto } from "../../../../domain";

export type ConvertFoodUnitResponse = Either<ExceptionBase | any, Result<ConvertedValueDto>>;
