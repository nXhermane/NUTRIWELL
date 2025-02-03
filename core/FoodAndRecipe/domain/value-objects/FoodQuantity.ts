import { ValueObject, Result, ExceptionBase, NegativeValueError, MeasureUnit, Guard } from "@shared";
import { CreateFoodQuantityProps } from "./createPropsTypes";

export interface IFoodQuantity {
   value: number;
   unit: MeasureUnit;
}
export class FoodQuantity extends ValueObject<IFoodQuantity> {
   constructor(props: IFoodQuantity) {
      super(props);
   }

   validate(props: IFoodQuantity): void {
      if (Guard.isNegative(props.value).succeeded) {
         throw new NegativeValueError("La valeur de la quantite d'aliment ne peut etre une valeur negative.");
      }
   }

   static create(props: CreateFoodQuantityProps, availableUnits: MeasureUnit[]): Result<FoodQuantity> {
      try {
         const measureUnit = MeasureUnit.create(props.unit);
         if (measureUnit.isFailure) return Result.fail<FoodQuantity>(String(measureUnit.err));
         if (availableUnits.includes(measureUnit.val))
            return Result.fail<FoodQuantity>(
               `The provided measure unit isn't valide.[NOTE]: Here are the supported measure unit (${availableUnits
                  .map((unit) => unit.toString())
                  .join(",")})`,
            );
         const quantity = new FoodQuantity({
            value: props.value,
            unit: measureUnit.val,
         });
         return Result.ok<FoodQuantity>(quantity);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<FoodQuantity>(`[${error.code}]:${error.message}`)
            : Result.fail<FoodQuantity>(`Erreur inattendue. ${FoodQuantity.constructor.name}`);
      }
   }
}
