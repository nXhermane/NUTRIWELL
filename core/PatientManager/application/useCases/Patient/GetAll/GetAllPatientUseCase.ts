import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetAllPatientRequest } from "./GetAllPatientRequest";
import { GetAllPatientResponse } from "./GetAllPatientResponse";
import { PatientRepository } from "../../../../infrastructure";
import { Patient } from "../../../../domain";
import { PatientDto } from "../../../dtos";

export class GetAllPatientUseCase implements UseCase<GetAllPatientRequest, GetAllPatientResponse> {
   constructor(private readonly patientRepo: PatientRepository, private readonly mapper: ApplicationMapper<Patient, PatientDto>) {}
   async execute(request: GetAllPatientRequest): Promise<GetAllPatientResponse> {
      try {
         const patients = await this.patientRepo.getAll(request.paginated);
         const patientDtos = patients.map((patient) => this.mapper.toResponse(patient));
         return right(Result.ok(patientDtos));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
