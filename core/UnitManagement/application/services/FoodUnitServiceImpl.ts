import { AppServiceResponse, Message, AggregateID, UseCase } from "@shared";
import { ConvertedValueDto, FoodUnitDto } from "../dtos";
import {
   CreateFoodUnitRequest,
   GetFoodUnitByIdOrSymbolRequest,
   GetAllFoodUnitRequest,
   GetAllFoodUnitIdAndSymbolRequest,
   DeleteFoodUnitRequest,
   ConvertFoodUnitRequest,
   CreateFoodUnitResponse,
   GetFoodUnitByIdOrSymbolResponse,
   GetAllFoodUnitResponse,
   GetAllFoodUnitIdAndSymbolResponse,
   DeleteFoodUnitResponse,
   ConvertFoodUnitResponse,
} from "../useCases";
import { FoodUnitService } from "./interfaces";

export interface FoodUnitServiceDependencies {
   createUC: UseCase<CreateFoodUnitRequest, CreateFoodUnitResponse>;
   getByIdOrSymbolUC: UseCase<GetFoodUnitByIdOrSymbolRequest, GetFoodUnitByIdOrSymbolResponse>;
   getAllUC: UseCase<GetAllFoodUnitRequest, GetAllFoodUnitResponse>;
   getAllIdAndSymbolUC: UseCase<GetAllFoodUnitIdAndSymbolRequest, GetAllFoodUnitIdAndSymbolResponse>;
   deleteUC: UseCase<DeleteFoodUnitRequest, DeleteFoodUnitResponse>;
   convertUC: UseCase<ConvertFoodUnitRequest, ConvertFoodUnitResponse>;
}
export class FoodUnitServiceImpl implements FoodUnitService {
   constructor(private readonly ucs: FoodUnitServiceDependencies) {}
   async create(req: CreateFoodUnitRequest): Promise<AppServiceResponse<boolean> | Message> {
      const res = await this.ucs.createUC.execute(req);
      if (res.isRight()) return { data: true };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getByIdOrSymbol(req: GetFoodUnitByIdOrSymbolRequest): Promise<AppServiceResponse<FoodUnitDto> | Message> {
      const res = await this.ucs.getByIdOrSymbolUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getAllFoodUnit(req: GetAllFoodUnitRequest): Promise<AppServiceResponse<FoodUnitDto[]> | Message> {
      const res = await this.ucs.getAllUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getAllFoodUnitIdAndSymbol(
      req: GetAllFoodUnitIdAndSymbolRequest,
   ): Promise<AppServiceResponse<{ symbol: string; id: AggregateID }[]> | Message> {
      const res = await this.ucs.getAllIdAndSymbolUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async delete(req: DeleteFoodUnitRequest): Promise<AppServiceResponse<boolean> | Message> {
      const res = await this.ucs.deleteUC.execute(req);
      if (res.isRight()) return { data: true };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async convert(req: ConvertFoodUnitRequest): Promise<AppServiceResponse<ConvertedValueDto> | Message> {
      const res = await this.ucs.convertUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
}
