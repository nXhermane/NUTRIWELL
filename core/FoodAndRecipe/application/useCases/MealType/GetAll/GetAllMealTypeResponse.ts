import { Either, ExceptionBase, Result } from "@shared";
import { MealTypeDto } from "../../../dtos";

export type GetAllMealTypeResponse = Either<ExceptionBase | any, Result<MealTypeDto[]>>;
