import { Either, ExceptionBase, Result } from "@shared";
import { FoodDto } from "../../../dtos";

export type GetAllFoodResponse = Either<ExceptionBase | any, Result<FoodDto[]>>;
