import { AggregateID, AppServiceResponse, Message } from "@shared";
import { CreateNutrientRequest, DeleteNutrientRequest, GetAllNutrientRequest, GetNutrientByIdOrTagnameRequest } from "../../useCases";
import { NutrientDto } from "../../dtos";

export interface NutrientManagerService {
   create(req: CreateNutrientRequest): Promise<AppServiceResponse<{ id: AggregateID }> | Message>;
   delete(req: DeleteNutrientRequest): Promise<AppServiceResponse<boolean> | Message>;
   getByIdOrTagname(req: GetNutrientByIdOrTagnameRequest): Promise<AppServiceResponse<NutrientDto> | Message>;
   getAll(req: GetAllNutrientRequest): Promise<AppServiceResponse<NutrientDto[]> | Message>;
}
