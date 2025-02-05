import { Either, ExceptionBase, Result } from "@shared";
import { FoodGroupDto } from "../../../dtos";

export type GetFoodGroupByIdResponse = Either<ExceptionBase | any, Result<FoodGroupDto>>;
