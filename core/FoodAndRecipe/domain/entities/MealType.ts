import { AggregateID, AuthValueError, EmptyStringError, Entity, Guard, handleError, Result } from "@shared";

export interface IMealType {
   name: string;
   code: string;
   translate: { [lang: string]: string };
   isSystemType: boolean;
}
//TODO: Je peux venir faire une implementation supplementaire , le cas ou les names change , I think about DomainEvent
export class MealType extends Entity<IMealType> {
   get name(): string {
      return this.props.name;
   }
   get code(): string {
      return this.props.code;
   }
   get isSystemType(): boolean {
      return this.props.isSystemType;
   }
   get translate(): { [lang: string]: string } {
      return this.props.translate;
   }
   public validate(): void {
      this._isValid = false;
      if (Guard.isEmpty(this.props.code).succeeded)
         throw new EmptyStringError("The code of mealtype can't be empty. Please give a correct code to MealType");
      if (Guard.isEmpty(this.props.name).succeeded)
         throw new EmptyStringError("The name of mealtype can't be empty. Please give a correct name to MealType");
      this._isValid = true;
   }
   changeName(name: string) {
      this.verifyIfTypeCanBeUpdate();
      this.props.name = name;
      this.validate();
   }
   changeCode(code: string) {
      this.verifyIfTypeCanBeUpdate();
      this.props.code = code;
      this.validate();
   }
   addNameToTranslate(langCode: string, name: string) {
      this.verifyIfTypeCanBeUpdate();
      this.props.translate[langCode] = name;
      this.validate();
   }

   private verifyIfTypeCanBeUpdate() {
      if (this.props.isSystemType) throw new AuthValueError("Impossible to modify a system MealType. Clone it to make a change.");
   }
   override delete() {
      this.verifyIfTypeCanBeUpdate()
      super.delete()
   }
   static create(props: IMealType, id: AggregateID): Result<MealType> {
      try {
         const mealType = new MealType({ props, id });
         return Result.ok<MealType>(mealType);
      } catch (error) {
         return handleError(error);
      }
   }
}
