import { ApplicationMapper, Gender, handleError, left, Result, right, UseCase } from "@shared";
import { CorrectPatientGenderRequest } from "./CorrectPatientGenderRequest";
import { CorrectPatientGenderResponse } from "./CorrectPatientGenderResponse";
import { PatientRepository } from "../../../../infrastructure";
import { Patient } from "../../../../domain";
import { PatientDto } from "../../../dtos";

export class CorrectPatientGenderUseCase implements UseCase<CorrectPatientGenderRequest, CorrectPatientGenderResponse> {
   constructor(private readonly patientRepo: PatientRepository, private readonly mapper: ApplicationMapper<Patient, PatientDto>) {}
   async execute(request: CorrectPatientGenderRequest): Promise<CorrectPatientGenderResponse> {
      try {
         const patient = await this.patientRepo.getById(request.patientId);
         const updateResult = this.updateGender(request.gender, patient);
         if (updateResult.isFailure) return left(updateResult);
         const patientDto = this.mapper.toResponse(patient);
         return right(Result.ok(patientDto));
      } catch (error) {
         return left(handleError(error));
      }
   }
   private updateGender(gender: CorrectPatientGenderRequest["gender"], patient: Patient): Result<any> {
      try {
         const genderResult = Gender.create(gender);
         if (genderResult.isFailure) return genderResult;
         patient.changeGender(genderResult.val);
         return Result.ok();
      } catch (error) {
         return handleError(error);
      }
   }
}
