import { AggregateID, AppServiceResponse, Message, UseCase } from "@shared";
import {
   CorrectPatientBirthdayRequest,
   CorrectPatientBirthdayResponse,
   CorrectPatientGenderRequest,
   CorrectPatientGenderResponse,
   CreatePatientRequest,
   CreatePatientResponse,
   DeletePatientRequest,
   DeletePatientResponse,
   GetAllPatientRequest,
   GetAllPatientResponse,
   GetPatientByIdRequest,
   GetPatientByIdResponse,
   UpdatePatientRequest,
   UpdatePatientResponse,
} from "../useCases";
import { PatientManagerService } from "./interfaces";
import { PatientDto } from "../dtos";

export interface PatientManagerServiceDependencies {
   createUC: UseCase<CreatePatientRequest, CreatePatientResponse>;
   deleteUC: UseCase<DeletePatientRequest, DeletePatientResponse>;
   updateUC: UseCase<UpdatePatientRequest, UpdatePatientResponse>;
   getByIdUC: UseCase<GetPatientByIdRequest, GetPatientByIdResponse>;
   getAllUC: UseCase<GetAllPatientRequest, GetAllPatientResponse>;
   correctGenderUC: UseCase<CorrectPatientGenderRequest, CorrectPatientGenderResponse>;
   correctBirthdayUC: UseCase<CorrectPatientBirthdayRequest, CorrectPatientBirthdayResponse>;
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
   async update(req: UpdatePatientRequest): Promise<AppServiceResponse<PatientDto> | Message> {
      const res = await this.ucs.updateUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
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
   async correctPatientGender(req: CorrectPatientGenderRequest): Promise<AppServiceResponse<PatientDto> | Message> {
      const res = await this.ucs.correctGenderUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async correctPatientBirthday(req: CorrectPatientBirthdayRequest): Promise<AppServiceResponse<PatientDto> | Message> {
      const res = await this.ucs.correctBirthdayUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
}
