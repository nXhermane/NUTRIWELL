import { Either, ExceptionBase, Result } from "@shared";
import { MealTypeDto } from "../../../dtos";

export type GetByIdMealTypeResponse = Either<ExceptionBase | any, Result<MealTypeDto>>;
