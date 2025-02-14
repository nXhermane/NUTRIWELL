import { ApplicationMapper, Birthday, handleError, left, Result, right, UseCase } from "@shared";
import { CorrectPatientBirthdayRequest } from "./CorrectPatientBirthdayRequest";
import { CorrectPatientBirthdayResponse } from "./CorrectPatientBirthdayResponse";
import { PatientRepository } from "../../../../infrastructure";
import { Patient } from "../../../../domain";
import { PatientDto } from "../../../dtos";

export class CorrectPatientBirthdayUseCase implements UseCase<CorrectPatientBirthdayRequest, CorrectPatientBirthdayResponse> {
   constructor(private readonly patientRepo: PatientRepository, private readonly mapper: ApplicationMapper<Patient, PatientDto>) {}
   async execute(request: CorrectPatientBirthdayRequest): Promise<CorrectPatientBirthdayResponse> {
      try {
         const patient = await this.patientRepo.getById(request.patientId);
         const updateResutl = this.updateBirthday(request.birthday, patient);
         if (updateResutl.isFailure) return left(updateResutl);
         const patientDto = this.mapper.toResponse(patient);
         return right(Result.ok(patientDto));
      } catch (error) {
         return left(handleError(error));
      }
   }
   private updateBirthday(birhtday: string, patient: Patient): Result<any> {
      try {
         const birthdayResult = Birthday.create(birhtday);
         if (birthdayResult.isFailure) return birthdayResult;
         patient.changeBirthday(birthdayResult.val);
         return Result.ok();
      } catch (error) {
         return handleError(error);
      }
   }
}
