import { AppServiceResponse, AggregateID, Message, UseCase } from "@shared";
import { RecipeDto, RecipeNutritionalValueDto } from "../dtos";
import {
   CreateRecipeRequest,
   DeleteRecipeRequest,
   GetRecipeByIdRequest,
   GetAllRecipeRequest,
   GetRecipeNutritionalvalueRequest,
   CreateRecipeResponse,
   GetRecipeByIdResponse,
   GetAllRecipeResponse,
   GetRecipeNutritionalvalueResponse,
} from "../useCases";
import { RecipeManagerService } from "./interfaces";
import { DeleteRecipeResponse } from "../useCases/Recipe/Delete/DeleteRecipeResponse";

export interface RecipeManagerServiceDependencies {
   createUC: UseCase<CreateRecipeRequest, CreateRecipeResponse>;
   deleteUC: UseCase<DeleteRecipeRequest, DeleteRecipeResponse>;
   getByIdUC: UseCase<GetRecipeByIdRequest, GetRecipeByIdResponse>;
   getAllUC: UseCase<GetAllRecipeRequest, GetAllRecipeResponse>;
   getRecipeNutritionalValueUC: UseCase<GetRecipeNutritionalvalueRequest, GetRecipeNutritionalvalueResponse>;
}
export class RecipeManagerServiceImpl implements RecipeManagerService {
   constructor(private readonly ucs: RecipeManagerServiceDependencies) {}
   async create(req: CreateRecipeRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message> {
      const res = await this.ucs.createUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async delete(req: DeleteRecipeRequest): Promise<AppServiceResponse<boolean> | Message> {
      const res = await this.ucs.deleteUC.execute(req);
      if (res.isRight()) return { data: true };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getById(req: GetRecipeByIdRequest): Promise<AppServiceResponse<RecipeDto> | Message> {
      const res = await this.ucs.getByIdUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getAll(req: GetAllRecipeRequest): Promise<AppServiceResponse<RecipeDto[]> | Message> {
      const res = await this.ucs.getAllUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
   async getRecipeNutritionalValue(req: GetRecipeNutritionalvalueRequest): Promise<AppServiceResponse<RecipeNutritionalValueDto> | Message> {
      const res = await this.ucs.getRecipeNutritionalValueUC.execute(req);
      if (res.isRight()) return { data: res.value.val };
      else return new Message("error", JSON.stringify(res.value.err));
   }
}
