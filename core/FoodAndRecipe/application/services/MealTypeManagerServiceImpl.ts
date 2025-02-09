import { AppServiceResponse, AggregateID, Message, UseCase } from "@shared";
import { MealTypeDto } from "../dtos";
import {
   CreateMealTypeRequest,
   DeleteMealTypeRequest,
   GetByIdMealTypeRequest,
   GetAllMealTypeRequest,
   CreateMealTypeResponse,
   DeleteMealTypeResponse,
   GetByIdMealTypeResponse,
   GetAllMealTypeResponse,
} from "../useCases";
import { MealTypeManagerService } from "./interfaces";

export interface MealTypeManagerServiceDependencies {
   createUC: UseCase<CreateMealTypeRequest, CreateMealTypeResponse>;
   deleteUC: UseCase<DeleteMealTypeRequest, DeleteMealTypeResponse>;
   getByIdUC: UseCase<GetByIdMealTypeRequest, GetByIdMealTypeResponse>;
   getAllUC: UseCase<GetAllMealTypeRequest, GetAllMealTypeResponse>;
}
export class MealTypeManagerServiceImpl implements MealTypeManagerService {
   constructor(private readonly ucs: MealTypeManagerServiceDependencies) {}
   async create(req: CreateMealTypeRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message> {
      const res = await this.ucs.createUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async delete(req: DeleteMealTypeRequest): Promise<AppServiceResponse<boolean> | Message> {
      const res = await this.ucs.deleteUC.execute(req);
      if (res.isRight()) return { data: true };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getById(req: GetByIdMealTypeRequest): Promise<AppServiceResponse<MealTypeDto> | Message> {
      const res = await this.ucs.getByIdUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getAll(req: GetAllMealTypeRequest): Promise<AppServiceResponse<MealTypeDto[]> | Message> {
      const res = await this.ucs.getAllUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
}
