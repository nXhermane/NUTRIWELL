import { AggregateID, EmptyStringError, Guard, handleError, InvalidReference, Quantity, Result, ValueObject } from "@shared";

export interface IFoodItem {
   name: string;
   foodId?: AggregateID;
   recipeId?: AggregateID;
   quantity: Quantity;
   /**
    * @property referenced : c'est true si l'aliment ou le recipe est references {ex: pour les aliments fait maison cette propriete doit etre definit a false}
    */
   referenced: boolean;
   /**
    * @property notes : Une description de l'aliment pour plus de precision au nutritionist
    */
   notes: string;
}

export class FoodItem extends ValueObject<IFoodItem> {
   isReferenced(): boolean {
      return this.props.referenced;
   }
   protected validate(props: Readonly<IFoodItem>): void {
      if (Guard.isEmpty(props.name).succeeded) throw new EmptyStringError("The fooddiarymeal foodItem name can't be empty.");
      if (props.referenced) {
         const unvalidReferenced = [Guard.isEmpty(props.foodId).succeeded, Guard.isEmpty(props.recipeId).succeeded].every((valid) => valid === false);
         if (unvalidReferenced) throw new InvalidReference("The foodItem is referenced but any reference are provided.");
      }
   }

   static create(props: IFoodItem): Result<FoodItem> {
      try {
         const foodItem = new FoodItem(props);
         return Result.ok(foodItem);
      } catch (error) {
         return handleError(error);
      }
   }
}
