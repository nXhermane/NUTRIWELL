import { AppServiceResponse, AggregateID, Message, UseCase } from "@shared";
import { FoodDto } from "../dtos";
import {
   CreateFoodRequest,
   DeleteFoodRequest,
   GetFoodByIdRequest,
   GetAllFoodRequest,
   GetFoodForQuantityRequest,
   CreateFoodResponse,
   DeleteFoodResponse,
   GetFoodByIdResponse,
   GetAllFoodResponse,
   GetFoodForQuantityResponse,
} from "../useCases";
import { FoodManagerService } from "./interfaces";

export interface FoodManagerServiceDependencies {
   createUC: UseCase<CreateFoodRequest, CreateFoodResponse>;
   deleteUC: UseCase<DeleteFoodRequest, DeleteFoodResponse>;
   getByIdUC: UseCase<GetFoodByIdRequest, GetFoodByIdResponse>;
   getAllUC: UseCase<GetAllFoodRequest, GetAllFoodResponse>;
   getFoodForQuantityUC: UseCase<GetFoodForQuantityRequest, GetFoodForQuantityResponse>;
}
export class FoodManagerServiceImpl implements FoodManagerService {
   constructor(private readonly ucs: FoodManagerServiceDependencies) {}
   async create(req: CreateFoodRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message> {
      const res = await this.ucs.createUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async delete(req: DeleteFoodRequest): Promise<AppServiceResponse<boolean> | Message> {
      const res = await this.ucs.deleteUC.execute(req);
      if (res.isRight()) return { data: true };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getById(req: GetFoodByIdRequest): Promise<AppServiceResponse<FoodDto> | Message> {
      const res = await this.ucs.getByIdUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getAll(req: GetAllFoodRequest): Promise<AppServiceResponse<FoodDto[]> | Message> {
      const res = await this.ucs.getAllUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getFoodForQuantity(req: GetFoodForQuantityRequest): Promise<AppServiceResponse<FoodDto> | Message> {
      const res = await this.ucs.getFoodForQuantityUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
}
