import { Either, ExceptionBase, Result } from "@shared";
import { FoodUnitDto } from "../../../dtos";
export type GetFoodUnitByIdOrSymbolResponse = Either<ExceptionBase | any, Result<FoodUnitDto>>;
