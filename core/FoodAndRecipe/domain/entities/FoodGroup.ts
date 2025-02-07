import { Entity, EmptyStringError, Guard, Result, AggregateID, AuthValueError, handleError } from "@shared";

export interface IFoodGroup {
   code: string;
   name: string;
   description?: string;
   translate: { [lang: string]: string };
   isSystemGroup: boolean;
}

export class FoodGroup extends Entity<IFoodGroup> {
   get code(): string {
      return this.props.code;
   }
   get name(): string {
      return this.props.name;
   }
   get description(): string {
      return this.props.description || "";
   }
   get isSystemGroup(): boolean {
      return this.props.isSystemGroup;
   }
   get translate(): { [lang: string]: string } {
      return this.props.translate;
   }
   setName(value: string) {
      this.verifyIfGroupCanBeUpdate();
      this.props.name = value;
      this.validate();
   }
   setCode(code: string) {
      this.verifyIfGroupCanBeUpdate();
      this.props.code = code;
      this.validate();
   }
   setDescription(desc: string) {
      this.verifyIfGroupCanBeUpdate();
      this.props.description = desc;
   }
   addNameToTranslate(langCode: string, name: string) {
      this.verifyIfGroupCanBeUpdate();
      this.props.translate[langCode] = name;
      this.validate();
   }

   /**
    * @description : Les groupes d'aliment du systeme ne peuvent pas etre modifier sauf ceux ajouter par l'utilisateur
    */

   private verifyIfGroupCanBeUpdate() {
      if (this.props.isSystemGroup) throw new AuthValueError("Impossible to modify a system FoodGroup. Clone it to make a change.");
   }
   validate(): void {
      this._isValid = false;
      if (Guard.isEmpty(this.props.code).succeeded) throw new EmptyStringError("The code of foodGroup must be provided and can't be empty.");
      if (Guard.isEmpty(this.props.name).succeeded) throw new EmptyStringError("The name of foodGroup must be provided and can't be empty.");
      this._isValid = true;
   }
   override delete() {
      this.verifyIfGroupCanBeUpdate();
      super.delete();
   }
   static create(createFoodGroupProps: IFoodGroup, id: AggregateID): Result<FoodGroup> {
      try {
         const foodGroup = new FoodGroup({ id, props: createFoodGroupProps });

         return Result.ok<FoodGroup>(foodGroup);
      } catch (error) {
         return handleError(error);
      }
   }
}
