import { AggregateID, ArgumentOutOfRangeException, EmptyStringError, Entity, Guard, handleError, Result, Time } from "@shared";
import { FoodItem, IFoodItem } from "../value-objects/FoodItem";
import { CreateMealProps } from "./createProps";

export interface IMeal {
   mealType: AggregateID;
   foodItems: FoodItem[];
   consumptionTime: Time;
   /**
    * @property Ici dans note on peux y decire les conditions dans lesquels la consommation a ete faire (withCompany,sittingAtTable,wachingTv) Ecrire par le patient
    */
   notes: string;
}

export class Meal extends Entity<IMeal> {
   private readonly MIN_FOOD_ITEM_ON_MEAL = 1;
   getConsumptionTime(): Time {
      return this.props.consumptionTime;
   }
   getFoodItems(): readonly FoodItem[] {
      return [...this.props.foodItems];
   }
   getMealType(): AggregateID {
      return this.props.mealType;
   }
   changeMealType(mealType: AggregateID) {
      this.validateMealType(mealType);
      this.props.mealType = mealType;
   }
   changeConsumptionTime(consumptionTime: Time) {
      this.props.consumptionTime = consumptionTime;
   }
   addFoodItem(foodItem: FoodItem) {
      this.props.foodItems.push(foodItem);
      this.validateFoodItems(this.props.foodItems);
   }
   removeFoodItem(foodItem: FoodItem) {
      const foodItemIndex = this.props.foodItems.findIndex((foodIt) => foodIt.equals(foodItem));
      if (foodItemIndex != -1) this.props.foodItems.splice(foodItemIndex, 1);
      this.validateFoodItems(this.props.foodItems);
   }

   validateMealType(mealType: AggregateID) {
      if (Guard.isEmpty(mealType).succeeded) throw new EmptyStringError("The mealType reference id can't be empty.");
   }
   validateFoodItems(foodItems: FoodItem[]) {
      if (foodItems.length < this.MIN_FOOD_ITEM_ON_MEAL)
         throw new ArgumentOutOfRangeException(`The meal must have at least ${this.MIN_FOOD_ITEM_ON_MEAL} foodItem.`);
   }
   public validate(): void {
      this._isValid = false;
      this.validateMealType(this.props.mealType);
      this.validateFoodItems(this.props.foodItems);
      this._isValid = true;
   }
   static create(createMealProps: CreateMealProps, id: AggregateID): Result<Meal> {
      try {
         const consumptionTimeResult = Time.create(createMealProps.consumptionTime);
         const foodItemResults = createMealProps.foodItems.map((foodItem) => FoodItem.create(foodItem));
         const combinedResult = Result.combine([consumptionTimeResult, ...foodItemResults]);
         if (combinedResult.isFailure) return combinedResult;

         const meal = new Meal({
            id,
            props: {
               consumptionTime: consumptionTimeResult.val,
               foodItems: foodItemResults.map((foodItemResult) => foodItemResult.val),
               mealType: createMealProps.mealType,
               notes: createMealProps.notes,
            },
         });
         return Result.ok(meal);
      } catch (error) {
         return handleError(error);
      }
   }
}
