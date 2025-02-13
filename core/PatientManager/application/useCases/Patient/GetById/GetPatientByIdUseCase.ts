import { ApplicationMapper, handleError, left, Result, right, UseCase } from "@shared";
import { GetPatientByIdRequest } from "./GetPatientByIdRequest";
import { GetPatientByIdResponse } from "./GetPatientByIdResponse";
import { PatientRepository } from "../../../../infrastructure";
import { Patient } from "../../../../domain";
import { PatientDto } from "../../../dtos";

export class GetPatientByIdUseCase implements UseCase<GetPatientByIdRequest, GetPatientByIdResponse> {
   constructor(private readonly patientRepo: PatientRepository, private readonly mapper: ApplicationMapper<Patient, PatientDto>) {}
   async execute(request: GetPatientByIdRequest): Promise<GetPatientByIdResponse> {
      try {
         const patient = await this.patientRepo.getById(request.patientId);
         const patientDto = this.mapper.toResponse(patient);
         return right(Result.ok(patientDto));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
