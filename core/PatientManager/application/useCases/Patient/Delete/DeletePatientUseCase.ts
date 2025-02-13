import { handleError, left, Result, right, UseCase } from "@shared";
import { DeletePatientRequest } from "./DeletePatientRequest";
import { DeletePatientResponse } from "./DeletePatientResponse";
import { PatientRepository } from "../../../../infrastructure";

export class DeletePatientUseCase implements UseCase<DeletePatientRequest, DeletePatientResponse> {
   constructor(private readonly patientRepo: PatientRepository) {}
   async execute(request: DeletePatientRequest): Promise<DeletePatientResponse> {
      try {
         const patient = await this.patientRepo.getById(request.patientId);
         patient.delete();
         await this.patientRepo.save(patient);
         return right(Result.ok());
      } catch (error) {
         return left(handleError(error));
      }
   }
}
