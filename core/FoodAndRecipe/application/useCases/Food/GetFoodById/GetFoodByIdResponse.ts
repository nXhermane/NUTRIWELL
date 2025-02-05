import { Either, ExceptionBase, Result } from "@shared";
import { FoodDto } from "../../../dtos";

export type GetFoodByIdResponse = Either<ExceptionBase | any, Result<FoodDto>>;
