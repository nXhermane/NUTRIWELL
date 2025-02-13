import { AggregateID, AppServiceResponse, Message } from "@shared";
import { CreatePatientRequest, DeletePatientRequest, GetAllPatientRequest, GetPatientByIdRequest } from "../../useCases";
import { PatientDto } from "../../dtos";

export interface PatientManagerService {
   create(req: CreatePatientRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message>;
   delete(req: DeletePatientRequest): Promise<AppServiceResponse<boolean> | Message>;
   getById(req: GetPatientByIdRequest): Promise<AppServiceResponse<PatientDto> | Message>;
   getAll(req: GetAllPatientRequest): Promise<AppServiceResponse<PatientDto[]> | Message>;
}
