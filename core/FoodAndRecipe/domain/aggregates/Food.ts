import { FoodGroup, IFoodGroup } from "./../entities";
import { AggregateRoot, BaseEntityProps, EmptyStringError, DuplicateValueError, AuthValueError, Guard } from "@shared";
import { INutrientAmount, NutrientAmount } from "../value-objects/NutrientAmount";
import { FoodQuantity, IFoodQuantity } from "../value-objects";

export interface IFood {
   code: string;
   name: string;
   origin: string;
   source: string;
   quantity: FoodQuantity;
   group: FoodGroup;
   nutrients: NutrientAmount[];
   translate: { [langcode: string]: string };
   isSytemFood: boolean;
}
//TODO: je dois ajouter la regle de nombre minimun de nutriment que dois avoir le food.
export class Food extends AggregateRoot<IFood> {
   get code(): string {
      return this.props.code;
   }
   get name(): string {
      return this.props.name;
   }
   get origin(): string {
      return this.props.origin;
   }
   get source(): string {
      return this.props.source;
   }
   get quantity(): IFoodQuantity {
      return this.props.quantity.unpack();
   }
   get group(): IFoodGroup & BaseEntityProps {
      return this.props.group.getProps();
   }
   get nutrients(): INutrientAmount[] {
      return this.props.nutrients.map((nutrient: NutrientAmount) => nutrient.unpack());
   }
   get translate(): { [langCode: string]: string } {
      return this.props.translate;
   }
   get isSystemFood(): boolean {
      return this.props.isSytemFood;
   }
   changeName(name: string) {
      this.verifyIfFoodCanBeUpdate();
      this.props.name = name;
      this.validate();
   }
   changeCode(code: string) {
      this.verifyIfFoodCanBeUpdate();
      this.props.code = code;
      this.validate();
   }
   changeOrigin(origin: string) {
      this.verifyIfFoodCanBeUpdate();
      this.props.origin = origin;
      this.validate();
   }
   changeSource(source: string) {
      this.verifyIfFoodCanBeUpdate();
      this.props.source = source;
      this.validate();
   }
   changeQuantity(quantity: FoodQuantity) {
      this.verifyIfFoodCanBeUpdate();
      this.props.quantity = quantity;
      this.validate();
   }
   changeGroup(group: FoodGroup) {
      this.verifyIfFoodCanBeUpdate();
      this.props.group = group;
      this.validate();
   }
   addNameToTranslate(langCode: string, name: string) {
      this.verifyIfFoodCanBeUpdate();
      this.props.translate[langCode] = name;
      this.validate();
   }
   addNutrientsToFood(...nutrientAmounts: NutrientAmount[]) {
      this.verifyIfFoodCanBeUpdate();
      nutrientAmounts.forEach((value: NutrientAmount) => {
         const existingNutrientIndex = this.findExistingNutrientIndex(value);
         if (existingNutrientIndex !== -1) {
            this.props.nutrients[existingNutrientIndex] = value;
         } else {
            this.props.nutrients.push(value);
         }
      });
      this.validate();
   }
   validate(): void {
      this._isValid = false;
      if (Guard.isEmpty(this.props.code).succeeded) throw new EmptyStringError("The food code can't be empty.");

      if (Guard.isEmpty(this.props.name).succeeded) throw new EmptyStringError("The food name can't be empty.Please enter a valid food name.");

      if (Guard.isEmpty(this.props.origin).succeeded) throw new EmptyStringError("The food origin can't be empty.");

      if (!this.validateNutrientIsUnique(this.props.nutrients)) throw new DuplicateValueError("The nutrient can't be duplicated.");

      for (const [langCode, name] of Object.entries(this.props.translate)) {
         if (Guard.isEmpty(langCode).succeeded) throw new EmptyStringError("The translate language code can't not be empty.");
         if (Guard.isEmpty(name).succeeded) throw new EmptyStringError("The name of food can't be empty.");
      }
      this._isValid = true;
   }
   private validateNutrientIsUnique(nutrients: NutrientAmount[]): boolean {
      const nutrientSetArray = new Set();
      for (const nutrient of nutrients) {
         const key = nutrient.unpack().nutrientId;
         if (nutrientSetArray.has(key)) {
            return false;
         }
         nutrientSetArray.add(key);
      }
      return true;
   }
   /**
    * @description : L'aliment du systeme ne peut pas etre modifier sauf ceux ajouter par l'utilisateur lui meme
    */

   private verifyIfFoodCanBeUpdate() {
      if (this.props.isSytemFood) throw new AuthValueError("Impossible to modify a system food. Clone it to make a change.");
   }

   private findExistingNutrientIndex(newNutrient: NutrientAmount): number {
      return this.props.nutrients.findIndex((nutrient) => {
         return nutrient.unpack().nutrientId === newNutrient.unpack().nutrientId;
      });
   }
   override delete(): void {
      this.verifyIfFoodCanBeUpdate();
      super.delete();
   }
}
