import { ExceptionBase, left, Result, right, UseCase } from "@shared";
import { DeleteFoodGroupRequest } from "./DeleteFoodGroupRequest";
import { DeleteFoodGroupResponse } from "./DeleteFoodGroupResponse";
import { FoodGroupRepository } from "../../../../infrastructure";

export class DeleteFoodGroupUseCase implements UseCase<DeleteFoodGroupRequest, DeleteFoodGroupResponse> {
   constructor(private readonly foodGroupRepo: FoodGroupRepository) {}
 async  execute(request: DeleteFoodGroupRequest): Promise<DeleteFoodGroupResponse> {
      try {
         const foodGroup = await this.foodGroupRepo.getById(request.id);
         foodGroup.delete()
         await this.foodGroupRepo.delete(request.id)
         return right(Result.ok<void>())
      } catch (error) {
         if (error instanceof ExceptionBase) return left(Result.fail<ExceptionBase>(`[${error.code}]:${error.message}`));
         return left(Result.fail<any>(`Unexpected Error : ${error}`));
      }
   }
}
