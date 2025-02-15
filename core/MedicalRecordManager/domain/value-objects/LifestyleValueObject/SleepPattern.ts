import { EmptyStringError, Guard, handleError, NegativeValueError, Result, Time, ValueObject } from "@shared";
import { PittsburghSleepQuality } from "../../constants";

export interface ISleepPattern {
   // Duree moyenne du sommeil
   averageSleepDuration: number;
   // Qualite de sommeil
   sleepQuality: PittsburghSleepQuality;
   // les troubles de sommeils
   sleepDisorders: string[];
   // Heure de coucher habituelle
   bedTime: Time;
   // Heure de reveil habituelle
   wakeTime: Time;
}

export class SleepPattern extends ValueObject<ISleepPattern> {
   protected validate(props: Readonly<ISleepPattern>): void {
      if (Guard.isNegative(props.averageSleepDuration).succeeded || Guard.isEmpty(props.averageSleepDuration).succeeded)
         throw new NegativeValueError("The average sleep duration must be a positive number and superior to zero.");
      if (props.sleepDisorders.map((disorder) => Guard.isEmpty(disorder).succeeded).every((val) => val === false))
         throw new EmptyStringError("The sleep disorder must be empty if it's provided.");
   }
   static create(props: ISleepPattern): Result<SleepPattern> {
      try {
         const sleepPattern = new SleepPattern(props);
         return Result.ok(sleepPattern);
      } catch (error) {
         return handleError(error);
      }
   }
}
