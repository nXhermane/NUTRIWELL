import { AggregateID, Email, Factory, handleError, left, Result, right, UseCase } from "@shared";
import { CreateNutritionistResponse } from "./CreateNutritionistResponse";
import { CreateNutritionistRequest } from "./CreateNutritionistRequest";
import { NutritionistRepository } from "../../../../infrastructure";
import { CreateNutritionistProps, Nutritionist } from "../../../../domain";

export class CreateNutritionistUseCase implements UseCase<CreateNutritionistRequest, CreateNutritionistResponse> {
   constructor(
      private readonly nutritionistRepo: NutritionistRepository,
      private readonly nutritionistFactory: Factory<CreateNutritionistProps, Nutritionist>,
   ) {}
   async execute(request: CreateNutritionistProps): Promise<CreateNutritionistResponse> {
      try {
         const email = Email.create(request.email);
         if (email.isFailure) return left(Result.fail(String(email.err)));
         const nutritionistExist = await this.nutritionistRepo.checkIfNutritionistWithEmailExist(email.val);
         if (nutritionistExist) return left(Result.fail(`Nutritionist already exists with email : ${email.val.toString()}`));

         const nutritionistResult = await Promise.resolve(this.nutritionistFactory.create(request));
         if (nutritionistResult.isFailure) return left(Result.fail(String(nutritionistResult.err)));
         nutritionistResult.val.created();
         await this.nutritionistRepo.save(nutritionistResult.val);

         return right(Result.ok<{ id: AggregateID }>({ id: nutritionistResult.val.id }));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
