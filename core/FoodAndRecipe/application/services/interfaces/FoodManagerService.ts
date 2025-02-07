import { AggregateID, AppServiceResponse, Message } from "@shared";
import { CreateFoodRequest, DeleteFoodRequest, GetAllFoodRequest, GetFoodByIdRequest, GetFoodForQuantityRequest } from "../../useCases";
import { FoodDto } from "../../dtos";

export interface FoodManagerService {
   create(req: CreateFoodRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message>;
   delete(req: DeleteFoodRequest): Promise<AppServiceResponse<boolean> | Message>;
   getById(req: GetFoodByIdRequest): Promise<AppServiceResponse<FoodDto> | Message>;
   getAll(req: GetAllFoodRequest): Promise<AppServiceResponse<FoodDto[]> | Message>;
   getFoodForQuantity(req: GetFoodForQuantityRequest): Promise<AppServiceResponse<FoodDto> | Message>;
}
