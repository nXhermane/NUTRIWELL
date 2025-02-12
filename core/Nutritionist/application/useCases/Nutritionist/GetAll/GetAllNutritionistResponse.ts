import { Either, ExceptionBase, Result } from "@shared";
import { NutritionistDto } from "../../../dtos/NutritionistDto";

export type GetAllNutritionistResponse = Either<ExceptionBase | any, Result<NutritionistDto[]>>;
