import { Guard, handleError, NegativeValueError, Result, ValueObject } from "@shared";
import { SmokingState } from "../../constants";

export interface ISubstanceConsumption {
   smokingState: SmokingState;
   cigaretesPerDay: number;
   // Littre per day
   alcoholConsumption: number;
   drugUsage: string;
   notes: string;
}
export class SubstanceConsumption extends ValueObject<ISubstanceConsumption> {
   protected validate(props: Readonly<ISubstanceConsumption>): void {
      if (Guard.isNegative(props.cigaretesPerDay).succeeded) throw new NegativeValueError("The cigaretes per day value cannot be negative.");
   }
   static create(props: ISubstanceConsumption): Result<SubstanceConsumption> {
      try {
         const substanceConsumption = new SubstanceConsumption(props);
         return Result.ok<SubstanceConsumption>(substanceConsumption);
      } catch (error) {
         return handleError(error);
      }
   }
}
