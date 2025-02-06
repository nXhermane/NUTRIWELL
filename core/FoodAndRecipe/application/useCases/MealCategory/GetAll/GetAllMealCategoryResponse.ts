import { Either, ExceptionBase, Result } from "@shared";
import { MealCategoryDto } from "../../../dtos";

export type GetAllMealCategoryResponse = Either<ExceptionBase | any, Result<MealCategoryDto[]>>;
