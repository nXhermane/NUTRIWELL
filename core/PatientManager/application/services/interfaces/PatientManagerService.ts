import { AggregateID, ApplicationMapper, AppServiceResponse, Message } from "@shared";
import {
   CorrectPatientBirthdayRequest,
   CorrectPatientGenderRequest,
   CreatePatientRequest,
   DeletePatientRequest,
   GetAllPatientRequest,
   GetPatientByIdRequest,
   UpdatePatientRequest,
} from "../../useCases";
import { PatientDto } from "../../dtos";

export interface PatientManagerService {
   create(req: CreatePatientRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message>;
   delete(req: DeletePatientRequest): Promise<AppServiceResponse<boolean> | Message>;
   update(req: UpdatePatientRequest): Promise<AppServiceResponse<PatientDto> | Message>;
   getById(req: GetPatientByIdRequest): Promise<AppServiceResponse<PatientDto> | Message>;
   getAll(req: GetAllPatientRequest): Promise<AppServiceResponse<PatientDto[]> | Message>;
   correctPatientGender(req: CorrectPatientGenderRequest): Promise<AppServiceResponse<PatientDto> | Message>;
   correctPatientBirthday(req: CorrectPatientBirthdayRequest): Promise<AppServiceResponse<PatientDto> | Message>;
}
