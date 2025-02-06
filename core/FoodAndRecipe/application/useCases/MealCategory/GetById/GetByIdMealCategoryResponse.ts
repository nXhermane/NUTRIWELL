import { Either, ExceptionBase, Result } from "@shared";
import { MealCategoryDto } from "../../../dtos";

export type GetByIdMealCategoryResponse = Either<ExceptionBase | any, Result<MealCategoryDto>>;
