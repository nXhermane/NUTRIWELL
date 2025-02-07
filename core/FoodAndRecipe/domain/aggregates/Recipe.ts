import { AggregateRoot, Guard, ArgumentOutOfRangeException, NegativeValueError, EmptyStringError, BaseEntityProps, AuthValueError } from "@shared";
import { MealType, MealCategory, IMealType, IMealCategory } from "../entities";
import { Ingredient, PreparationStep, FoodQuantity, IIngredient, IPreparationStep, IFoodQuantity } from "../value-objects";

export interface IRecipe {
   name: string;
   type: MealType;
   category: MealCategory;
   ingredients: Ingredient[];
   preparationMethod: PreparationStep[];
   /**
    *  @property The cooking time in minutes
    */
   cookingTime: number;
   quantity: FoodQuantity;
   description: string;
   author: string;
   translate: { [langcode: string]: string };
   isSystemRecipe: boolean;
}
export class Recipe extends AggregateRoot<IRecipe> {
   get name(): string {
      return this.props.name;
   }
   get type(): BaseEntityProps & IMealType {
      return this.props.type.getProps();
   }
   get category(): BaseEntityProps & IMealCategory {
      return this.props.category.getProps();
   }
   get quantity(): IFoodQuantity {
      return this.props.quantity.unpack();
   }
   get description(): string {
      return this.props.description;
   }
   get ingredients(): IIngredient[] {
      return this.props.ingredients.map((ingredient: Ingredient) => ingredient.unpack());
   }
   get preparationMethod(): IPreparationStep[] {
      return this.props.preparationMethod.map((prepationStep: PreparationStep) => prepationStep.unpack());
   }
   get cookingTime(): number {
      return this.props.cookingTime;
   }
   get author(): string {
      return this.props.author;
   }
   get isSystemRecipe(): boolean {
      return this.props.isSystemRecipe;
   }
   changeName(name: string) {
      this.verifyRecipeCanBeUpdate();
      this.props.name = name;
      this.validate();
   }

   changeCategory(category: MealCategory) {
      this.verifyRecipeCanBeUpdate();
      this.props.category = category;
      this.validate();
   }
   changeType(type: MealType) {
      this.verifyRecipeCanBeUpdate();
      this.props.type = type;
      this.validate();
   }
   changeAuthor(author: string) {
      this.verifyRecipeCanBeUpdate();
      this.props.author = author;
      this.validate();
   }
   changeCookingTime(cookingTime: number) {
      this.verifyRecipeCanBeUpdate();
      this.props.cookingTime = cookingTime;
      this.validate();
   }
   changeQuantity(foodQuantity: FoodQuantity) {
      this.verifyRecipeCanBeUpdate();
      this.props.quantity = foodQuantity;
      this.validate();
   }
   getTotalPreparationTime(): number {
      let totalPrepTime = this.props.cookingTime;
      for (const step of this.props.preparationMethod) {
         totalPrepTime += step.estimatedTime;
      }
      return totalPrepTime;
   }
   addPreparationStep(step: PreparationStep): void {
      this.verifyRecipeCanBeUpdate();
      this.props.preparationMethod.push(step);
      this.validate();
   }
   addIngredient(ingredient: Ingredient): void {
      this.verifyRecipeCanBeUpdate();
      this.props.ingredients.push(ingredient);
      this.validate();
   }
   addNameToTranslate(langCode: string, name: string) {
      this.verifyRecipeCanBeUpdate();
      this.props.translate[langCode] = name;
      this.validate();
   }
   /**
    * @description: A user of app can't update a system recipe.
    */
   verifyRecipeCanBeUpdate(): void {
      if (this.props.isSystemRecipe) throw new AuthValueError("Impossible to modify a sytem recipe. Clone it to make a change.");
   }
   removeIngredient(ingredient: Ingredient): void {
      this.verifyRecipeCanBeUpdate();
      const index = this.props.ingredients.findIndex((ing: Ingredient) => ing.foodId === ingredient.foodId);
      if (index !== -1) {
         this.props.ingredients.splice(index, 1);
         this.validate();
      }
   }
   removePreparationStep(step: PreparationStep): void {
      this.verifyRecipeCanBeUpdate();
      const index = this.props.preparationMethod.findIndex((prepStep: PreparationStep) => prepStep.stepNumber === step.stepNumber);
      if (index !== -1) {
         this.props.preparationMethod.splice(index, 1);
         this.validate();
      }
   }
   validate(): void {
      this._isValid = false;
      if (Guard.isEmpty(this.props.ingredients).succeeded) throw new ArgumentOutOfRangeException("The recipe must have ingredient.");

      if (Guard.isNegative(this.props.cookingTime).succeeded) throw new NegativeValueError("The cooking time of recipe must be negative.");

      if (Guard.isEmpty(this.props.name).succeeded) throw new EmptyStringError("The recipe name must be empty.");
      this._isValid = true;
   }
   override delete(): void {
      this.verifyRecipeCanBeUpdate();
      super.delete();
   }
}
