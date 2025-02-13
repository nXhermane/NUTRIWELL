import { Factory, handleError, left, Result, right, UseCase } from "@shared";
import { CreatePatientRequest } from "./CreatePatientRequest";
import { CreatePatientResponse } from "./CreatePatientResponse";
import { PatientRepository } from "../../../../infrastructure";
import { CreatePatientProps, Patient } from "../../../../domain";

export class CreatePatientUseCase implements UseCase<CreatePatientRequest, CreatePatientResponse> {
   constructor(private readonly patientRepository: PatientRepository, private readonly patientFactory: Factory<CreatePatientProps, Patient>) {}
   async execute(request: CreatePatientProps): Promise<CreatePatientResponse> {
      try {
         const patientResult = await Promise.resolve(this.patientFactory.create(request));
         if (patientResult.isFailure) return left(patientResult);
         const patient = patientResult.val;
         patient.created();
         await this.patientRepository.save(patient);
         return right(Result.ok({ id: patient.id }));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
