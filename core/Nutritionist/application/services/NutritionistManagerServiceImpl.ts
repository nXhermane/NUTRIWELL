import { AppServiceResponse, AggregateID, Message, UseCase } from "@shared";
import { NutritionistDto } from "../dtos/NutritionistDto";
import {
   CreateNutritionistRequest,
   DeleteNutritionistRequest,
   GetNutritionistByIdRequest,
   GetNutritionistByEmailRequest,
   CreateNutritionistResponse,
   DeleteNutritionistResponse,
   GetNutritionistByIdResponse,
   GetNutritionistByEmailResponse,
   GetAllNutritionistRequest,
   GetAllNutritionistResponse,
} from "../useCases";
import { NutritionistManagerSercice } from "./interfaces";
export interface NutritionistManagerServiceDependencies {
   createUC: UseCase<CreateNutritionistRequest, CreateNutritionistResponse>;
   deleteUC: UseCase<DeleteNutritionistRequest, DeleteNutritionistResponse>;
   getByIdUC: UseCase<GetNutritionistByIdRequest, GetNutritionistByIdResponse>;
   getByEmailUC: UseCase<GetNutritionistByEmailRequest, GetNutritionistByEmailResponse>;
   getAllUC: UseCase<GetAllNutritionistRequest, GetAllNutritionistResponse>;
}
export class NutritionistManagerServiceImpl implements NutritionistManagerSercice {
   constructor(private readonly ucs: NutritionistManagerServiceDependencies) {}

   async create(req: CreateNutritionistRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message> {
      const res = await this.ucs.createUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async delete(req: DeleteNutritionistRequest): Promise<AppServiceResponse<boolean> | Message> {
      const res = await this.ucs.deleteUC.execute(req);
      if (res.isRight()) return { data: true };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getById(req: GetNutritionistByIdRequest): Promise<AppServiceResponse<NutritionistDto> | Message> {
      const res = await this.ucs.getByIdUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getByEmail(req: GetNutritionistByEmailRequest): Promise<AppServiceResponse<NutritionistDto> | Message> {
      const res = await this.ucs.getByEmailUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getAll(req: GetAllNutritionistRequest): Promise<AppServiceResponse<NutritionistDto[]> | Message> {
      const res = await this.ucs.getAllUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
}
