import { ValueObject, InvalidReference, Guard, ExceptionBase, Result } from "@shared";
import { AggregateID, EmptyStringError } from "@shared";
import { FoodQuantity, IFoodQuantity } from "./FoodQuantity";

export interface IIngredient {
   name: string;
   quantity: FoodQuantity;
   foodId: AggregateID;
}

export class Ingredient extends ValueObject<IIngredient> {
   constructor(props: IIngredient) {
      super(props);
   }
   get name(): string {
      return this.props.name;
   }
   get foodId(): AggregateID {
      return this.props.foodId;
   }
   get quantity(): IFoodQuantity {
      return this.props.quantity.unpack();
   }

   validateIngredient(foodIds: AggregateID[]): void {
      if (!foodIds.includes(this.props.foodId)) {
         throw new InvalidReference("The FoodId associate to Ingredient isn't correct.");
      }
   }
   validate(props: IIngredient) {
      if (Guard.isEmpty(props.foodId).succeeded) {
         throw new EmptyStringError("The name of ingredient can't be empty. Please give an correct name to Ingredient.");
      }
   }

   // FoodIds : est l'ensemble des ids present dans l'application
   static create(props: IIngredient, foodIds: AggregateID[]): Result<Ingredient> {
      try {
         const ingredient = new Ingredient(props);
         const validateResult = Result.encapsulate<boolean>((): boolean => {
            ingredient.validateIngredient(foodIds);
            return true;
         });
         if (validateResult.isFailure) return Result.fail<Ingredient>(`[Error]: ${(validateResult.err as any)?.toJSON() || validateResult.err}`);
         return Result.ok<Ingredient>(ingredient);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<Ingredient>(`[${error.code}]:${error.message}`)
            : Result.fail<Ingredient>(`Erreur inattendue. ${Ingredient.constructor.name}`);
      }
   }
}
