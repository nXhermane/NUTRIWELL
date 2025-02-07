import { AppServiceResponse, AggregateID, Message, UseCase } from "@shared";
import { FoodDto } from "../dtos";
import { CreateFoodRequest, DeleteFoodRequest, GetFoodByIdRequest, GetAllFoodRequest, GetFoodForQuantityRequest, CreateFoodResponse, DeleteFoodResponse } from "../useCases";


export interface FoodManagerService {
    createUC: UseCase<CreateFoodRequest , CreateFoodResponse> 
    deleteUC: UseCase<DeleteFoodRequest,DeleteFoodResponse> 
    getByIdUC: UseCase<GetFoodByIdRequest. GetFoodByIdResponse>
}
export class FoodManagerServiceImpl implements FoodManagerService {
    create(req: CreateFoodRequest): Promise<AppServiceResponse<{ id: AggregateID; }> | Message> {
        throw new Error("Method not implemented.");
    }
    delete(req: DeleteFoodRequest): Promise<AppServiceResponse<boolean> | Message> {
        throw new Error("Method not implemented.");
    }
    getById(req: GetFoodByIdRequest): Promise<AppServiceResponse<FoodDto> | Message> {
        throw new Error("Method not implemented.");
    }
    getAll(req: GetAllFoodRequest): Promise<AppServiceResponse<FoodDto[]> | Message> {
        throw new Error("Method not implemented.");
    }
    getFoodForQuantity(req: GetFoodForQuantityRequest): Promise<AppServiceResponse<FoodDto> | Message> {
        throw new Error("Method not implemented.");
    }

}