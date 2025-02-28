import { handleError, Result, ValueObject } from "@shared";
import {
   CookingAbility,
   EatingCompanions,
   EmploymentStatus,
   FoodAccess,
   IncomeLevel,
   LivingEnvironment,
   MaritalStatus,
   MealPreparationFrequency,
   Religion,
   UsualPlaceToEat,
} from "../../constants";

export interface ISocialLife {
   livingEnvironment: LivingEnvironment;
   maritalStatus: MaritalStatus;
   // Nombre de personnes dans le foyer
   eatingCompanions: EatingCompanions[];
   employmentStatus: EmploymentStatus;
   incomeLevel: IncomeLevel;
   religion: Religion;
   foodAccess: FoodAccess;
   cookingAbility: CookingAbility;
   mealPreparationFrequency: MealPreparationFrequency;
   usualPlacesToEat: UsualPlaceToEat[];
   notes: string;
}

export class SocialLife extends ValueObject<ISocialLife> {
   protected validate(props: Readonly<ISocialLife>): void {}
   static create(props: ISocialLife): Result<SocialLife> {
      try {
         const socialLife = new SocialLife(props);
         return Result.ok(socialLife);
      } catch (error) {
         return handleError(error);
      }
   }
}
