import { ApplicationMapper, ExceptionBase, left, Result, right, UseCase } from "@shared";
import { GetAllFoodRequest } from "./GetAllFoodRequest";
import { GetAllFoodResponse } from "./GetAllFoodResponse";
import { FoodRepository } from "../../../../infrastructure";
import { Food } from "../../../../domain";
import { FoodDto } from "../../../dtos";

export class GetAllFoodUseCase implements UseCase<GetAllFoodRequest, GetAllFoodResponse> {
   constructor(private readonly foodRepo: FoodRepository, private readonly mapper: ApplicationMapper<Food, FoodDto>) {}
   async execute(request: GetAllFoodRequest): Promise<GetAllFoodResponse> {
      try {
         const foods = await this.foodRepo.getAll(request.paginated);
         const foodDtos = foods.map((food) => this.mapper.toResponse(food));
         return right(Result.ok<FoodDto[]>(foodDtos));
      } catch (error) {
         if (error instanceof ExceptionBase) return left(Result.fail<ExceptionBase>(`[${error.code}]:${error.message}`));
         return left(Result.fail<any>(`Unexpected Error : ${error}`));
      }
   }
}
