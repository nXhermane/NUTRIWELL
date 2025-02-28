import { AggregateID, Entity, handleError, Result } from "@shared";
import { Occupation, PhysicalActivity, SleepPattern, SocialLife, StressLevel, SubstanceConsumption } from "../value-objects";

export interface ILifestyleHistory {
   physicalActivity: PhysicalActivity;
   sleepPattern: SleepPattern;
   occupation: Occupation;
   stressLevel: StressLevel;
   substanceConsumption: SubstanceConsumption;
   socialLife: SocialLife;
   notes: string;
}

export class LifestyleHistory extends Entity<ILifestyleHistory> {
   public validate(): void {
      this._isValid = false;
      // Validation scripts ...
      this._isValid = true;
   }
   getPhysicalActivity(): PhysicalActivity {
      return this.props.physicalActivity;
   }
   getSleepPattern(): SleepPattern {
      return this.props.sleepPattern;
   }
   getOccupation(): Occupation {
      return this.props.occupation;
   }
   getStressLevel(): StressLevel {
      return this.props.stressLevel;
   }
   getSubstanceConsumption(): SubstanceConsumption {
      return this.props.substanceConsumption;
   }
   getSocialLife(): SocialLife {
      return this.props.socialLife;
   }
   getNotes(): string {
      return this.props.notes;
   }
   changePhysicalActivity(physicalActivity: PhysicalActivity) {
      this.props.physicalActivity = physicalActivity;
   }
   changeSleepPattern(sleepPattern: SleepPattern) {
      this.props.sleepPattern = sleepPattern;
   }
   changeOccupation(occupation: Occupation) {
      this.props.occupation = occupation;
   }
   changeStressLevel(stressLevel: StressLevel) {
      this.props.stressLevel = stressLevel;
   }
   changeSubstanceConsumption(substanceConsumption: SubstanceConsumption) {
      this.props.substanceConsumption = substanceConsumption;
   }
   changeSocialLife(socialLife: SocialLife) {
      this.props.socialLife = socialLife;
   }
   changeNotes(notes: string) {
      this.props.notes = notes;
   }
   static create(props: ILifestyleHistory, id: AggregateID): Result<LifestyleHistory> {
      try {
         const lifestyleHistory = new LifestyleHistory({ id, props });
         return Result.ok(lifestyleHistory);
      } catch (error) {
         return handleError(error);
      }
   }
}
