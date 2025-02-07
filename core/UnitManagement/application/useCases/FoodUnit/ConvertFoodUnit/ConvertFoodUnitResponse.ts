import { Either, ExceptionBase, Result } from "@shared";
import { ConvertedValueDto } from "../../../dtos";


export type ConvertFoodUnitResponse = Either<ExceptionBase | any, Result<ConvertedValueDto>>;
