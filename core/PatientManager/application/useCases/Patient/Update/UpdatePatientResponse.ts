import { Either, ExceptionBase, Result } from "@shared";
import { PatientDto } from "../../../dtos";

export type UpdatePatientResponse = Either<ExceptionBase | any, Result<PatientDto>>;
