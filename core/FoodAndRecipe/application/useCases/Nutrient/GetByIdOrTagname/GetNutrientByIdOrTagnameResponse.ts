import { Either, ExceptionBase, Result } from "@shared";
import { NutrientDto } from "../../../dtos";

export type GetNutrientByIdOrTagnameResponse = Either<ExceptionBase | any, Result<NutrientDto>>;
