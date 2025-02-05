import { Either, ExceptionBase, Result } from "@shared";
import { FoodGroupDto } from "../../../dtos";

export type GetAllFoodGroupResponse = Either<ExceptionBase | any, Result<FoodGroupDto[]>>;
