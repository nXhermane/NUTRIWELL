import { AggregateID, AppServiceResponse, Message } from "@shared";
import {
   CreateNutritionistRequest,
   DeleteNutritionistRequest,
   GetAllNutritionistRequest,
   GetNutritionistByEmailRequest,
   GetNutritionistByIdRequest,
} from "../../useCases";
import { NutritionistDto } from "../../dtos/NutritionistDto";

export interface NutritionistManagerSercice {
   create(req: CreateNutritionistRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message>;
   delete(req: DeleteNutritionistRequest): Promise<AppServiceResponse<boolean> | Message>;
   getById(req: GetNutritionistByIdRequest): Promise<AppServiceResponse<NutritionistDto> | Message>;
   getByEmail(req: GetNutritionistByEmailRequest): Promise<AppServiceResponse<NutritionistDto> | Message>;
   getAll(req: GetAllNutritionistRequest): Promise<AppServiceResponse<NutritionistDto[]> | Message>;
}
