import { ApplicationMapper, Email, handleError, left, Result, right, UseCase } from "@shared";
import { GetNutritionistByEmailRequest } from "./GetNutritionistByEmailRequest";
import { GetNutritionistByEmailResponse } from "./GetNutritionistByEmailResponse";
import { NutritionistRepository } from "../../../../infrastructure";
import { Nutritionist } from "../../../../domain";
import { NutritionistDto } from "../../../dtos/NutritionistDto";

export class GetNutritionistByEmailUseCase implements UseCase<GetNutritionistByEmailRequest, GetNutritionistByEmailResponse> {
   constructor(
      private readonly nutritionistRepo: NutritionistRepository,
      private readonly mapper: ApplicationMapper<Nutritionist, NutritionistDto>,
   ) {}
   async execute(request: GetNutritionistByEmailRequest): Promise<GetNutritionistByEmailResponse> {
      try {
         const email = Email.create(request.email);
         if (email.isFailure) return left(email);
         const nutritionsit = await this.nutritionistRepo.getByEmail(email.val);
         const nutritionistDto = this.mapper.toResponse(nutritionsit);
         return right(Result.ok<NutritionistDto>(nutritionistDto));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
