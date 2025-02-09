import { AppServiceResponse, AggregateID, Message, UseCase } from "@shared";
import { NutrientDto } from "../dtos";
import {
   CreateNutrientRequest,
   DeleteNutrientRequest,
   GetNutrientByIdOrTagnameRequest,
   GetAllNutrientRequest,
   CreateNutrientResponse,
   GetNutrientByIdOrTagnameResponse,
   GetAllNutrientResponse,
   DeleteNutrientResponse,
} from "../useCases";
import { NutrientManagerService } from "./interfaces";

export interface NutrientManagerServiceDependencies {
   createUC: UseCase<CreateNutrientRequest, CreateNutrientResponse>;
   deleteUC: UseCase<DeleteNutrientRequest, DeleteNutrientResponse>;
   getByIdOrTagUC: UseCase<GetNutrientByIdOrTagnameRequest, GetNutrientByIdOrTagnameResponse>;
   getAllUC: UseCase<GetAllNutrientRequest, GetAllNutrientResponse>;
}
export class NutrientManagerServiceImpl implements NutrientManagerService {
   constructor(private readonly ucs: NutrientManagerServiceDependencies) {}
   async create(req: CreateNutrientRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message> {
      const res = await this.ucs.createUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async delete(req: DeleteNutrientRequest): Promise<AppServiceResponse<boolean> | Message> {
      const res = await this.ucs.deleteUC.execute(req);
      if (res.isRight()) return { data: true };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getByIdOrTagname(req: GetNutrientByIdOrTagnameRequest): Promise<AppServiceResponse<NutrientDto> | Message> {
      const res = await this.ucs.getByIdOrTagUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getAll(req: GetAllNutrientRequest): Promise<AppServiceResponse<NutrientDto[]> | Message> {
      const res = await this.ucs.getAllUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
}
