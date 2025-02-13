import { Either, ExceptionBase, Result } from "@shared";
import { PatientDto } from "../../../dtos";

export type GetAllPatientResponse = Either<ExceptionBase | any, Result<PatientDto[]>>;
