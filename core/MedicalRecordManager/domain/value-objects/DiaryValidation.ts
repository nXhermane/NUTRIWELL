import { AggregateID, DomainDate, Guard, handleError, InvalidReference, Result, ValueObject } from "@shared";

export interface IDiaryValidation {
   consultationid: AggregateID;
   date: DomainDate;
   nutritionistNotes: string;
}
export class DiaryValidation extends ValueObject<IDiaryValidation> {
   get consultationId(): AggregateID {
      return this.props.consultationid;
   }
   get validationDate(): string {
      return this.props.date.toString();
   }
   get nutritionistNotes(): string {
      return this.props.nutritionistNotes;
   }
   protected validate(props: Readonly<IDiaryValidation>): void {
      if (Guard.isEmpty(this.consultationId).succeeded)
         throw new InvalidReference("the Conusltation reference can't be empty. Please choose a valid reference.");
   }
   static create(props: { consultationId: AggregateID; date: string; notes: string }): Result<DiaryValidation> {
      try {
         const date = DomainDate.create(props.date);
         if (date.isFailure) return Result.fail(String(date.err));
         const validation = new DiaryValidation({
            consultationid: props.consultationId,
            date: date.val,
            nutritionistNotes: props.notes,
         });
         return Result.ok(validation);
      } catch (error) {
         return handleError(error);
      }
   }
}
