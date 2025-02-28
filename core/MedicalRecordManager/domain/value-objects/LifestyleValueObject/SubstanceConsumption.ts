import { Guard, handleError, NegativeValueError, Result, ValueObject } from "@shared";
import { AlcoholConsumption, DrugUse, SmokingState } from "../../constants";

export interface ISubstanceConsumption {
   smokingState: SmokingState;
   cigaretesPerDay: number;
   alcoholConsumption: AlcoholConsumption;
   drugUsage: DrugUse;
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
