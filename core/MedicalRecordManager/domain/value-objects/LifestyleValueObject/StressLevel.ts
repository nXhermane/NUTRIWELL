import { ArgumentOutOfRangeException, handleError, Result, ValueObject } from "@shared";

const STRESSLEVELRANGE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export interface IStressLevel {
   level: (typeof STRESSLEVELRANGE)[number];
   source: string;
   notes: string;
}

export class StressLevel extends ValueObject<IStressLevel> {
   protected validate(props: Readonly<IStressLevel>): void {
      if (!STRESSLEVELRANGE.includes(props.level)) throw new ArgumentOutOfRangeException(`The stress level cannot be out of range 1 - 10.`);
   }
   static create(props: IStressLevel): Result<StressLevel> {
      try {
         const level = new StressLevel(props);
         return Result.ok(level);
      } catch (error) {
         return handleError(error);
      }
   }
}
