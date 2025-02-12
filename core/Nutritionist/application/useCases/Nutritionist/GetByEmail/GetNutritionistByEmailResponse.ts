import { Either, ExceptionBase, Result } from "@shared";
import { NutritionistDto } from "../../../dtos/NutritionistDto";

export type GetNutritionistByEmailResponse = Either<ExceptionBase | any, Result<NutritionistDto>>;
