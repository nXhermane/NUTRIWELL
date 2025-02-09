import { AggregateID, AppServiceResponse, Message } from "@shared";
import {
   CreateRecipeRequest,
   DeleteRecipeRequest,
   GetAllRecipeRequest,
   GetRecipeByIdRequest,
   GetRecipeNutritionalvalueRequest,
} from "../../useCases";
import { RecipeDto, RecipeNutritionalValueDto } from "../../dtos";

export interface RecipeManagerService {
   create(req: CreateRecipeRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message>;
   delete(req: DeleteRecipeRequest): Promise<AppServiceResponse<boolean> | Message>;
   getById(req: GetRecipeByIdRequest): Promise<AppServiceResponse<RecipeDto> | Message>;
   getAll(req: GetAllRecipeRequest): Promise<AppServiceResponse<RecipeDto[]> | Message>;
   getRecipeNutritionalValue(req: GetRecipeNutritionalvalueRequest): Promise<AppServiceResponse<RecipeNutritionalValueDto> | Message>;
}
