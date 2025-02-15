import { EmptyStringError, Guard, handleError, Result, ValueObject } from "@shared";
import { WorkEnvironment } from "../../constants";

export interface IOccupation {
   occupation: string;
   industry: string;
   workEnvironment: WorkEnvironment;
   notes: string;
}

export class Occupation extends ValueObject<IOccupation> {
   protected validate(props: Readonly<IOccupation>): void {
      if (Guard.isEmpty(props.occupation).succeeded) throw new EmptyStringError("The patient occupation can't be empty when it's provided.");
      if (Guard.isEmpty(props.industry).succeeded) throw new EmptyStringError("The patient occupation industry must be provided.");
   }
   static create(props: IOccupation): Result<Occupation> {
      try {
         const occupation = new Occupation(props);
         return Result.ok(occupation);
      } catch (error) {
         return handleError(error);
      }
   }
}
