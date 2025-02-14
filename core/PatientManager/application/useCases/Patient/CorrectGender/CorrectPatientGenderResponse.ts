import { Either, ExceptionBase, Result } from "@shared";
import { PatientDto } from "../../../dtos";

export type CorrectPatientGenderResponse = Either<ExceptionBase | any, Result<PatientDto>>;
