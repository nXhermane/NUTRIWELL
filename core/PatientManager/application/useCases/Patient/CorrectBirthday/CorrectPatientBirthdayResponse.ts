import { Either, ExceptionBase, Result } from "@shared";
import { PatientDto } from "../../../dtos";

export type CorrectPatientBirthdayResponse = Either<ExceptionBase | any, Result<PatientDto>>;
