import { AggregateID, EmptyStringError, ExceptionBase, Guard, InvalidReference, NegativeValueError, Result, ValueObject } from "@shared";

export interface INutrientAmount {
   nutrientId: AggregateID;
   value: number;
   originalValue?: string;
}

export class NutrientAmount extends ValueObject<INutrientAmount> {
   protected validate(props: INutrientAmount): void {
      if (Guard.isEmpty(props.nutrientId).succeeded) throw new EmptyStringError("The nutrientId can't be empty or null");
      if (Guard.isNegative(props.value).succeeded) throw new NegativeValueError("The nutrient amount value can't be negative");
   }
   static create(props: INutrientAmount,allSupportedNutrientId: AggregateID[]): Result<NutrientAmount> {
      try {
         if(!allSupportedNutrientId.includes(props.nutrientId)) throw new InvalidReference("The provided nutrient Id is not supported.")
         const nutrientAmount = new NutrientAmount(props);
         return Result.ok<NutrientAmount>(nutrientAmount);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<NutrientAmount>(`[${error.code}]:${error.message}`)
            : Result.fail<NutrientAmount>(`Erreur inattendue. ${NutrientAmount.constructor.name}`);
      }
   }
}
