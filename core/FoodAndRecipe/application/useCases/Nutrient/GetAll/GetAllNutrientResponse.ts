import { Either, ExceptionBase, Result } from "@shared";
import { NutrientDto } from "../../../dtos";

export type GetAllNutrientResponse = Either<ExceptionBase | any, Result<NutrientDto[]>>;
