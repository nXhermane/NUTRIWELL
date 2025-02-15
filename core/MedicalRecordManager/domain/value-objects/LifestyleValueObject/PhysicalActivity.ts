import { EmptyStringError, Guard, handleError, NegativeValueError, Result, ValueObject } from "@shared";
import { PhysicalActivityIntencity, PhysicalActivityLevel } from "../../constants";

export interface PhysicalActivityInfo {
   /**
    * @property - ActivtyType : Course , natation
    */
   activityType: string;
   frequencePerWeek: number;
   durationMinutes: number;
   intensity: PhysicalActivityIntencity;
}
export interface IPhysicalActivity {
   level: PhysicalActivityLevel;
   activities: PhysicalActivityInfo[];
}
export class PhysicalActivity extends ValueObject<IPhysicalActivity> {
   protected validate(props: Readonly<IPhysicalActivity>): void {
      for (const activity of props.activities) {
         if (Guard.isEmpty(activity.activityType).succeeded) throw new EmptyStringError("The physicalActivity type cannot be empty.");
         if (Guard.isNegative(activity.durationMinutes).succeeded || Guard.isEmpty(activity.frequencePerWeek).succeeded)
            throw new NegativeValueError("The physical Activity duration or frequency per week must be a positive value.");
      }
   }

   static create(props: IPhysicalActivity): Result<PhysicalActivity> {
      try {
         const physicalActivity = new PhysicalActivity(props);
         return Result.ok(physicalActivity);
      } catch (error) {
         return handleError(error);
      }
   }
}
