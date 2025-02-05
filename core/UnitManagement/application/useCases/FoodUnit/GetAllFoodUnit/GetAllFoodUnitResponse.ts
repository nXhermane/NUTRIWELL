import { Either, ExceptionBase, Result } from "@shared";
import { FoodUnitDto } from "../../../dtos";

export type GetAllFoodUnitResponse = Either<ExceptionBase | any, Result<FoodUnitDto[]>>;
