import { AggregateID, AppServiceResponse, Message, UseCase } from "@shared";
import {
   CreatePatientRequest,
   CreatePatientResponse,
   DeletePatientRequest,
   DeletePatientResponse,
   GetAllPatientRequest,
   GetAllPatientResponse,
   GetPatientByIdRequest,
   GetPatientByIdResponse,
} from "../useCases";
import { PatientManagerService } from "./interfaces";
import { PatientDto } from "../dtos";
// TODO: Add Update patient methode and add the birthday and gender correction usecase 
export interface PatientManagerServiceDependencies {
   createUC: UseCase<CreatePatientRequest, CreatePatientResponse>;
   deleteUC: UseCase<DeletePatientRequest, DeletePatientResponse>;
   getByIdUC: UseCase<GetPatientByIdRequest, GetPatientByIdResponse>;
   getAllUC: UseCase<GetAllPatientRequest, GetAllPatientResponse>;
}

export class PatientManagerServiceImpl implements PatientManagerService {
   constructor(private readonly ucs: PatientManagerServiceDependencies) {}
   async create(req: CreatePatientRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message> {
      const res = await this.ucs.createUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async delete(req: DeletePatientRequest): Promise<AppServiceResponse<boolean> | Message> {
      const res = await this.ucs.deleteUC.execute(req);
      if (res.isRight()) return { data: true };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getById(req: GetPatientByIdRequest): Promise<AppServiceResponse<PatientDto> | Message> {
      const res = await this.ucs.getByIdUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getAll(req: GetAllPatientRequest): Promise<AppServiceResponse<PatientDto[]> | Message> {
      const res = await this.ucs.getAllUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
}
