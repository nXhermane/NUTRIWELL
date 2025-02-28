import { ArgumentOutOfRangeException, EmptyStringError, Guard, handleError, Result, ValueObject } from "@shared";
export interface IDieteryRestriction {
   value: string[];
}
export class DieteryRestriction extends ValueObject<IDieteryRestriction> {
   protected validate(props: IDieteryRestriction): void {
      for (const restriction of props.value) {
         if (Guard.isEmpty(restriction).succeeded) throw new EmptyStringError("Dietery restriction cannot be empty");
         if (restriction.length < 3) {
            throw new ArgumentOutOfRangeException("Dietery restriction must have at least 3 characters");
         }
      }
   }
   static create(value: string[]): Result<DieteryRestriction> {
      try {
         return Result.ok<DieteryRestriction>(new DieteryRestriction({ value }));
      } catch (error) {
         return handleError(error);
      }
   }
}
