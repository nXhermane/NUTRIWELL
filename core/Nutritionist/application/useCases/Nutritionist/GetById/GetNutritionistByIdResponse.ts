import { Either, ExceptionBase, Result } from "@shared";
import { NutritionistDto } from "../../../dtos/NutritionistDto";

export type GetNutritionistByIdResponse = Either<ExceptionBase | any, Result<NutritionistDto>>;
