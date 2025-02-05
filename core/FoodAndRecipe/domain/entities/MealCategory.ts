import { AggregateID, EmptyStringError, Entity, ExceptionBase, Guard, Result } from "@shared";

export interface IMealCategory {
   name: string;
   code: string;
}
//TODO: Je peux venir faire une implementation supplementaire , le cas ou les names change , I think about DomainEvent
export class MealCategory extends Entity<IMealCategory> {
   public validate(): void {
      this._isValid = false;
      if (Guard.isEmpty(this.props.code).succeeded)
         throw new EmptyStringError("The code of mealCategory can't be empty. Please give a correct code to MealCategory");
      if (Guard.isEmpty(this.props.name).succeeded)
         throw new EmptyStringError("The name of mealCategory can't be empty. Please give a correct name to MealCategory");
      this._isValid = true;
   }
   setName(name: string) {
      this.props.name = name;
      this.validate();
   }
   setCode(code: string) {
      this.props.code = code;
      this.validate();
   }

   static create(props: IMealCategory, id: AggregateID): Result<MealCategory> {
      try {
         const mealCategory = new MealCategory({ props, id });
         return Result.ok<MealCategory>(mealCategory);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<MealCategory>(`[${error.code}]:${error.message}`)
            : Result.fail<MealCategory>(`Erreur inattendue. ${MealCategory.constructor.name}`);
      }
   }
}
