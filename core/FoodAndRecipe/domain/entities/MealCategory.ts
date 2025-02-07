import { AggregateID, AuthValueError, EmptyStringError, Entity, Guard, handleError, Result } from "@shared";

export interface IMealCategory {
   name: string;
   code: string;
   translate: { [lang: string]: string };
   isSystemCategory: boolean;
}
//TODO: Je peux venir faire une implementation supplementaire , le cas ou les names change , I think about DomainEvent
export class MealCategory extends Entity<IMealCategory> {
   get name(): string {
      return this.props.name;
   }
   get code(): string {
      return this.props.code;
   }
   get isSystemCategory(): boolean {
      return this.props.isSystemCategory;
   }
   get translate(): { [lang: string]: string } {
      return this.props.translate;
   }

   public validate(): void {
      this._isValid = false;
      if (Guard.isEmpty(this.props.code).succeeded)
         throw new EmptyStringError("The code of mealCategory can't be empty. Please give a correct code to MealCategory");
      if (Guard.isEmpty(this.props.name).succeeded)
         throw new EmptyStringError("The name of mealCategory can't be empty. Please give a correct name to MealCategory");
      this._isValid = true;
   }
   setName(name: string) {
      this.verifyIfCategoryCanBeUpdate();
      this.props.name = name;
      this.validate();
   }
   setCode(code: string) {
      this.verifyIfCategoryCanBeUpdate();
      this.props.code = code;
      this.validate();
   }
   addNameToTranslate(langCode: string, name: string) {
      this.verifyIfCategoryCanBeUpdate();
      this.props.translate[langCode] = name;
      this.validate();
   }

   private verifyIfCategoryCanBeUpdate() {
      if (this.props.isSystemCategory) throw new AuthValueError("Impossible to modify a system MealCategory. Clone it to make a change.");
   }
   override delete() {
      this.verifyIfCategoryCanBeUpdate();
      super.delete();
   }
   static create(props: IMealCategory, id: AggregateID): Result<MealCategory> {
      try {
         const mealCategory = new MealCategory({ props, id });
         return Result.ok<MealCategory>(mealCategory);
      } catch (error) {
         return handleError(error);
      }
   }
}
