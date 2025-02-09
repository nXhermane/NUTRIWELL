import { AppServiceResponse, AggregateID, Message, UseCase } from "@shared";
import { MealCategoryDto } from "../dtos";
import {
   CreateMealCategoryRequest,
   DeleteMealTypeRequest,
   GetByIdMealCategoryRequest,
   GetAllMealCategoryRequest,
   CreateMealCategoryResponse,
   DeleteMealCategoryRequest,
   DeleteMealCategoryResponse,
   GetAllMealCategoryResponse,
   GetByIdMealCategoryResponse,
} from "../useCases";
import { MealCategoryManagerService } from "./interfaces";

export interface MealCategoryManagerServiceDependencies {
   createUC: UseCase<CreateMealCategoryRequest, CreateMealCategoryResponse>;
   deleteUC: UseCase<DeleteMealCategoryRequest, DeleteMealCategoryResponse>;
   getByIdUC: UseCase<GetByIdMealCategoryRequest, GetByIdMealCategoryResponse>;
   getAllUC: UseCase<GetAllMealCategoryRequest, GetAllMealCategoryResponse>;
}
export class MealCategoryManagerServiceImpl implements MealCategoryManagerService {
   constructor(private readonly ucs: MealCategoryManagerServiceDependencies) {}
   async create(req: CreateMealCategoryRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message> {
      const res = await this.ucs.createUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async delete(req: DeleteMealTypeRequest): Promise<AppServiceResponse<boolean> | Message> {
      const res = await this.ucs.deleteUC.execute(req);
      if (res.isRight()) return { data: true };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getById(req: GetByIdMealCategoryRequest): Promise<AppServiceResponse<MealCategoryDto> | Message> {
      const res = await this.ucs.getByIdUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getAll(req: GetAllMealCategoryRequest): Promise<AppServiceResponse<MealCategoryDto[]> | Message> {
      const res = await this.ucs.getAllUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
}
