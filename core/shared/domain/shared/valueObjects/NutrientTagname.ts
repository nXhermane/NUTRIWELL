import { Guard, Result } from "./../../../core";
import { EmptyStringError, ExceptionBase } from "./../../../exceptions";
import { ValueObject, DomainPrimitive } from "./../../common";

export class NutrientTagname extends ValueObject<string> {
   toString(): string {
      return this.props._value;
   }
   protected validate(props: DomainPrimitive<string>): void {
      if (Guard.isEmpty(props._value)) throw new EmptyStringError("The InfoodsTagname of nutrient can't be empty.");
   }
   static create(tagname: string): Result<NutrientTagname> {
      try {
         const nutrientTagname = new NutrientTagname({ _value: tagname });
         return Result.ok<NutrientTagname>(nutrientTagname);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<NutrientTagname>(`[${error.code}]:${error.message}`)
            : Result.fail<NutrientTagname>(`Erreur inattendue. ${NutrientTagname?.constructor.name}`);
      }
   }
}
