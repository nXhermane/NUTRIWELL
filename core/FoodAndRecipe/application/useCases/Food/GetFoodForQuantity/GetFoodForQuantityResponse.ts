import { Either, ExceptionBase, Result } from "@shared";
import { FoodDto } from "../../../dtos";

export type GetFoodForQuantityResponse = Either<ExceptionBase | any, Result<FoodDto>>;
