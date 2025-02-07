import { AggregateID, AppServiceResponse, Message } from "@shared";
import { CreateMealTypeRequest, DeleteMealTypeRequest, GetAllMealTypeRequest, GetByIdMealTypeRequest } from "../../useCases";
import { MealTypeDto } from "../../dtos";

export interface MealTypeManagerService {
   create(req: CreateMealTypeRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message>;
   delete(req: DeleteMealTypeRequest): Promise<AppServiceResponse<boolean> | Message>;
   getById(req: GetByIdMealTypeRequest): Promise<AppServiceResponse<MealTypeDto> | Message>;
   getAll(req: GetAllMealTypeRequest): Promise<AppServiceResponse<MealTypeDto[]> | Message>;
}
