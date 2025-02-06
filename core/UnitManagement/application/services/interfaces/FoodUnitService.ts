import { AggregateID, AppServiceResponse, Message } from "@shared";
import {
   ConvertFoodUnitRequest,
   CreateFoodUnitRequest,
   DeleteFoodUnitRequest,
   GetAllFoodUnitIdAndSymbolRequest,
   GetAllFoodUnitRequest,
   GetFoodUnitByIdOrSymbolRequest,
} from "../../useCases";
import { ConvertedValueDto, FoodUnitDto } from "../../dtos";


export interface FoodUnitService {
   create(req: CreateFoodUnitRequest): Promise<AppServiceResponse<boolean> | Message>;
   getByIdOrSymbol(req: GetFoodUnitByIdOrSymbolRequest): Promise<AppServiceResponse<FoodUnitDto> | Message>;
   getAllFoodUnit(req: GetAllFoodUnitRequest): Promise<AppServiceResponse<FoodUnitDto[]> | Message>;
   getAllFoodUnitIdAndSymbol(req: GetAllFoodUnitIdAndSymbolRequest): Promise<AppServiceResponse<{ symbol: string; id: AggregateID }[]> | Message>;
   delete(req: DeleteFoodUnitRequest): Promise<AppServiceResponse<boolean> | Message>;
   convert(req: ConvertFoodUnitRequest): Promise<AppServiceResponse<ConvertedValueDto> | Message>;
}
