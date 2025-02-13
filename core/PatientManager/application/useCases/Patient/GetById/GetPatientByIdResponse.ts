import { Either, ExceptionBase, Result } from "@shared";
import { PatientDto } from "../../../dtos";

export type GetPatientByIdResponse = Either<ExceptionBase | any, Result<PatientDto>>;
