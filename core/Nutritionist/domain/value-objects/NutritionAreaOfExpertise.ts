import { ValueObject, Guard, EmptyStringError, Result, handleError } from "@shared";

export interface INutritionAreaOfExpertise {
   name: string;
   description?: string;
}

export class NutritionAreaOfExpertise extends ValueObject<INutritionAreaOfExpertise> {
   validate(props: INutritionAreaOfExpertise): void {
      if (Guard.isEmpty(props.name).succeeded) throw new EmptyStringError("The name of nutritionAreaOfExpertise can't be empty.");
   }

   static create(props: INutritionAreaOfExpertise): Result<NutritionAreaOfExpertise> {
      try {
         const speciality = new NutritionAreaOfExpertise(props);
         return Result.ok<NutritionAreaOfExpertise>(speciality);
      } catch (e: any) {
         return handleError(e);
      }
   }
}
