import {
   AggregateRoot,
   Guard,
   ArgumentOutOfRangeException,
   NegativeValueError,
   EmptyStringError,
   Result,
   ExceptionBase,
   BaseEntityProps,
   GenerateUniqueId,
} from "@shared";
import { MealType, MealCategory, IMealType, IMealCategory } from "../entities";
import { Ingredient, PreparationStep, FoodQuantity, IIngredient, IPreparationStep, IFoodQuantity } from "../value-objects";
import { CreateRecipeProps } from "./createPropsType";

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
   setName(name: string) {
      this.props.name = name;
      this.validate();
   }

   setCategory(category: MealCategory) {
      this.props.category = category;
      this.validate();
   }
   setType(type: MealType) {
      this.props.type = type;
      this.validate();
   }
   setAuthor(author: string) {
      this.props.author = author;
      this.validate();
   }
   setCookingTime(cookingTime: number) {
      this.props.cookingTime = cookingTime;
      this.validate();
   }
   setQuantity(foodQuantity: FoodQuantity) {
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
      this.props.preparationMethod.push(step);
      this.validate();
   }
   addIngredient(ingredient: Ingredient): void {
      this.props.ingredients.push(ingredient);
      this.validate();
   }
   addNameToTranslate(langCode: string, name: string) {
      this.props.translate[langCode] = name;
      this.validate();
   }

   removeIngredient(ingredient: Ingredient): void {
      const index = this.props.ingredients.findIndex((ing: Ingredient) => ing.foodId === ingredient.foodId);
      if (index !== -1) {
         this.props.ingredients.splice(index, 1);
         this.validate();
      }
   }
   removePreparationStep(step: PreparationStep): void {
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
   //TODO: Modifier le factory pour donner plus de sens a cette methode create : Prends juste le constructeur et ne t'embete pas avec Ca
   static async create(createRecipeProps: CreateRecipeProps, generateUniqueId: GenerateUniqueId): Promise<Result<Recipe>> {
      try {
         const id = generateUniqueId.generate().toValue();
         const recipe = new Recipe({
            id,
            props: createRecipeProps,
         });
         return Result.ok<Recipe>(recipe);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<Recipe>(`[${error.code}]:${error.message}`)
            : Result.fail<Recipe>(`Erreur inattendue. ${Recipe.constructor.name}`);
      }
   }
}
