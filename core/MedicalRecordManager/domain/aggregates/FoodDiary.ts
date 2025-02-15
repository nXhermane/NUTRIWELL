import {
   AggregateID,
   AggregateRoot,
   ArgumentInvalidException,
   ArgumentOutOfRangeException,
   DomainDate,
   Guard,
   IllegalActionException,
   IllegalStateException,
   InvalidReference,
   NotFoundException,
   RegistrationDate,
   Time,
} from "@shared";
import { Meal } from "../entites/Meal";
import { DiaryStatus } from "../constants";
import { DiaryValidation } from "../value-objects";

export interface IFoodDiary {
   date: RegistrationDate;
   meals: Meal[];
   status: DiaryStatus;
   validation?: DiaryValidation;
   patientId: AggregateID;
}
/**
 * Pour le food diary, les regles suivantes s'appliqueront
 * 1.  - ne pas deppasser les nombres de repas par jours qui est 8 normalement
 * 2.  - il faut que le time entre les consumptionTime soit coherentes , c'est a dire la durer entre le time le moins eleve et le time le plus eleve ne dois depasser 24h
 * 3.  - Validation et Status
 *      - on ne peux completed si on n'est pas en draft
 *      - on ne peux validated si on n'est completed
 *      - on ne peux achived si on n'est validated
 *      - **DRAFT** = On peux effectuer des changements sur le journal
 *      - **COMPLETED** = On ne peux effectuer de changement m'est on peux repaser a l'etat de COMPLETED
 *      - **VALIDATED** = On ne peux effectuer aucun changement et on ne peux n'on plus changer d'etat vers COMPLETED ou DRAFT
 *      - **ACHIVED** = Disponible en lecture seule pour les consultations historiques ( Achiver lorsque qu'une autre consultation vient apres celle ou il a ete valider )
 */
export class FoodDiary extends AggregateRoot<IFoodDiary> {
   /**
    * @readonly Cette valeur devrait etre 8 mais je le mets a 10 d'abord
    */
   private static readonly MAX_MEAL_PER_DAY = 10;
   private static readonly MAX_TIME_SPAN_HOURS = 24;

   public completed() {
      if (this.props.status != DiaryStatus.DRAFT) {
         throw new IllegalStateException("Only DRAFT diaries can be completed.");
      }
      this.props.status = DiaryStatus.COMPLETED;
   }

   public validated(consultationId: AggregateID, notes: string) {
      if (this.props.status != DiaryStatus.COMPLETED) {
         throw new IllegalStateException("Only COMPLETED diaries can be validated.");
      }
      const diaryValidation = new DiaryValidation({
         consultationid: consultationId,
         date: new DomainDate(),
         nutritionistNotes: notes,
      });

      this.props.validation = diaryValidation;

      this.props.status = DiaryStatus.VALIDATED;
   }

   public achived(nextConsultationId: AggregateID, nextConsultationDate: DomainDate) {
      if (this.props.status != DiaryStatus.VALIDATED) {
         throw new IllegalStateException("Only VALIDATED diaries can be ACHIVED.");
      }
      if (Guard.isEmpty(nextConsultationId).succeeded) {
         throw new InvalidReference("Cannot archived without a next consultation.");
      }
      if (nextConsultationDate.isAfter((this.props.validation as DiaryValidation).unpack().date)) {
         throw new ArgumentInvalidException("The next consultation date must be after the food diary validation date.");
      }

      this.props.status = DiaryStatus.VALIDATED;
   }
   public revertToDraft(): void {
      if (this.props.status != DiaryStatus.COMPLETED) throw new IllegalStateException("Can only revert from COMPLETED to DRAFT.");
      this.props.status = DiaryStatus.DRAFT;
   }

   public getId(): AggregateID {
      return this.id;
   }
   public getPatientId(): AggregateID {
      return this.props.patientId;
   }
   public getStatus(): DiaryStatus {
      return this.props.status;
   }
   public getValidation(): DiaryValidation | undefined {
      return this.props.validation;
   }
   public getMeals(): readonly Meal[] {
      return [...this.props.meals];
   }

   addMeal(meal: Meal): void {
      this.checkIfFoodDirayIsAbleForModification();
      const tempMeals = [...this.props.meals, meal];
      this.validateMeals(tempMeals);
      this.props.meals.push(meal);
   }
   updateMeal(mealId: AggregateID, updateMeal: Meal): void {
      this.checkIfFoodDirayIsAbleForModification();
      const currentIndex = this.props.meals.findIndex((m) => m.id === mealId);
      if (currentIndex === -1) {
         throw new NotFoundException("Meal not found");
      }
      const tempMeals = [...this.props.meals];
      tempMeals[currentIndex] = updateMeal;
      this.validateMeals(tempMeals);
      this.props.meals[currentIndex] = updateMeal;
   }
   public validate(): void {
      this._isValid = false;
      if (![DiaryStatus.DRAFT, DiaryStatus.COMPLETED].includes(this.props.status)) {
         if (Guard.isEmpty(this.props.validation).succeeded) {
            throw new IllegalStateException(
               `The diary validation must be provided when the status of FoodDiary is not ${DiaryStatus.DRAFT} or ${DiaryStatus.COMPLETED}`,
            );
         }
      }
      if (Guard.isEmpty(this.props.patientId).succeeded)
         throw new InvalidReference("The patient id cannot be empty.Please change it to valid reference.");
      this.validateMeals(this.props.meals);
      this._isValid = true;
   }
   private validateMeals(meals: Meal[]) {
      if (meals.length > FoodDiary.MAX_MEAL_PER_DAY) {
         throw new ArgumentOutOfRangeException(`Cannot exceed ${FoodDiary.MAX_MEAL_PER_DAY} meals per day`);
      }
      const [earliest, lastest] = this.getTimeSpanBoundaries(meals);
      const timeSpanHours = this.calculateTimeSpanHours(earliest, lastest);
      if (timeSpanHours > FoodDiary.MAX_TIME_SPAN_HOURS) {
         throw new ArgumentOutOfRangeException(`Time span between meals cannot exceed ${FoodDiary.MAX_TIME_SPAN_HOURS} hours`);
      }
   }

   private isEditable(): boolean {
      return this.props.status === DiaryStatus.DRAFT;
   }
   private calculateTimeSpanHours(start: Date, end: Date) {
      const diffMilliseconds = end.getTime() - start.getTime();
      return diffMilliseconds / (1000 * 60 * 60);
   }
   private getTimeSpanBoundaries(meals: Meal[]): [Date, Date] {
      const foodDiaryMealConsumptionTimes = meals.map((meal) => meal.getConsumptionTime());
      // Sort the consumption Time to be able to get the earliest Meal Time and latestMealTime
      const sortedConsumptionTimes = foodDiaryMealConsumptionTimes.sort((aTime: Time, bTime: Time) =>
         aTime.isBefore(bTime) ? -1 : aTime.equals(bTime) ? 0 : 1,
      );
      return [sortedConsumptionTimes[0].getDate(), sortedConsumptionTimes[sortedConsumptionTimes.length - 1].getDate()];
   }
   checkIfFoodDirayIsAbleForModification() {
      if (!this.isEditable()) {
         throw new IllegalActionException("Cannot modify a diary that is not in DRAFT status");
      }
   }
}
