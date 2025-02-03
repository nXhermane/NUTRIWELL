import { FoodGroup, IFoodGroup } from "./../entities";
import {
   AggregateRoot,
   BaseEntityProps,
   EmptyStringError,
   DuplicateValueError,
   AuthValueError,
   Guard,
   Result,
   ExceptionBase,
   GenerateUniqueId,
} from "@shared";
import { INutrientAmount, NutrientAmount } from "../value-objects/NutrientAmount";
import { FoodQuantity, IFoodQuantity } from "../value-objects";
import { CreateFoodProps } from "./createPropsType";

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
   setName(name: string) {
      this.verifyIfFoodCanBeUpdate();
      this.props.name = name;
      this.validate();
   }
   setCode(code: string) {
      this.verifyIfFoodCanBeUpdate();
      this.props.code = code;
      this.validate();
   }
   setOrigin(origin: string) {
      this.verifyIfFoodCanBeUpdate();
      this.props.origin = origin;
      this.validate();
   }
   setSource(source: string) {
      this.verifyIfFoodCanBeUpdate();
      this.props.source = source;
      this.validate();
   }
   setQuantity(quantity: FoodQuantity) {
      this.verifyIfFoodCanBeUpdate();
      this.props.quantity = quantity;
      this.validate();
   }
   setGroup(group: FoodGroup) {
      this.verifyIfFoodCanBeUpdate();
      this.props.group = group;
      this.validate();
   }
   addNameToTranslate(langCode: string, name: string) {
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
      if (Guard.isEmpty(this.props.code).succeeded) {
         throw new EmptyStringError("The food code can't be empty.");
      }
      if (Guard.isEmpty(this.props.name).succeeded) {
         throw new EmptyStringError("The food name can't be empty.Please enter a valid food name.");
      }
      if (Guard.isEmpty(this.props.origin).succeeded) {
         throw new EmptyStringError("The food origin can't be empty.");
      }
      if (!this.validateNutrientIsUnique(this.props.nutrients)) {
         throw new DuplicateValueError("The nutrient can't be duplicated.");
      }
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
    * @Note : L'aliment du systeme ne peut pas etre modifier sauf ceux ajouter par l'utilisateur lui meme
    *
    */

   private verifyIfFoodCanBeUpdate() {
      if (this.props.isSytemFood) throw new AuthValueError("Impossible to modify a system food.");
   }

   private findExistingNutrientIndex(newNutrient: NutrientAmount): number {
      return this.props.nutrients.findIndex((nutrient) => {
         return nutrient.unpack().nutrientId === newNutrient.unpack().nutrientId;
      });
   }
   static create(createFoodProps: CreateFoodProps, generateUniqueId: GenerateUniqueId): Result<Food> {
      try {
         const id = generateUniqueId.generate().toValue();

         const food = new Food({
            id: id,
            props: createFoodProps,
         });
         return Result.ok<Food>(food);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<Food>(`[${error.code}]:${error.message}`)
            : Result.fail<Food>(`Erreur inattendue. ${Food.constructor.name}`);
      }
   }
}
