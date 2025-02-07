import { AggregateID, AppServiceResponse, Message } from "@shared";
import { CreateMealCategoryRequest, DeleteMealTypeRequest, GetAllMealCategoryRequest, GetByIdMealCategoryRequest } from "../../useCases";
import { MealCategoryDto } from "../../dtos";

export interface MealCategoryManagerService {
   create(req: CreateMealCategoryRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message>;
   delete(req: DeleteMealTypeRequest): Promise<AppServiceResponse<boolean> | Message>;
   getById(req: GetByIdMealCategoryRequest): Promise<AppServiceResponse<MealCategoryDto> | Message>;
   getAll(req: GetAllMealCategoryRequest): Promise<AppServiceResponse<MealCategoryDto[]> | Message>;
}
