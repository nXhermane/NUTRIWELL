import { AggregateID, ExceptionBase, Factory, GenerateUniqueId, Guard, Result } from "@shared";
import { Recipe } from "../aggregates";
import { CreateRecipeProps } from "./factoriesProps";
import { FoodRepository, FoodUnitValidator, MealCategoryRepository, MealTypeRepository } from "../../infrastructure";
import { IMealCategory, IMealType, MealCategory, MealType } from "../entities";
import { FoodQuantity, Ingredient, PreparationStep } from "../value-objects";

export interface RecipeFactoryDependencies {
   idGenerator: GenerateUniqueId;
   foodUnitValidator: FoodUnitValidator;
   mealTypeRepo: MealTypeRepository;
   mealCategoryRepo: MealCategoryRepository;
   foodRepo: FoodRepository;
}
export class RecipeFactory implements Factory<CreateRecipeProps, Recipe> {
   constructor(private dependencies: RecipeFactoryDependencies) {}
   async create(props: CreateRecipeProps): Promise<Result<Recipe>> {
      try {
         const { type, category, ingredients, quantity, preparationMethod, ...otherProps } = props;

         const mealType = !Guard.isObject(type).succeeded
            ? await this.dependencies.mealTypeRepo.getById(type as AggregateID)
            : MealType.create(type as IMealType, this.dependencies.idGenerator.generate().toValue());

         const mealCategory = !Guard.isObject(category).succeeded
            ? await this.dependencies.mealCategoryRepo.getById(category as AggregateID)
            : MealCategory.create(category as IMealCategory, this.dependencies.idGenerator.generate().toValue());

         const foodIds = await this.dependencies.foodRepo.getAllId();
         const ingregientsResult = ingredients.map((ingredientProps) => Ingredient.create(ingredientProps, foodIds));

         const foodAvailableUnit = await this.dependencies.foodUnitValidator.getAvailableUnits();
         const foodQuantity = FoodQuantity.create(quantity, foodAvailableUnit);

         const preparationStepsResult = preparationMethod.map((stepProps) => PreparationStep.create(stepProps));

         const combinedResult = Result.combine([
            mealType instanceof Result ? mealType : Result.ok(),
            mealCategory instanceof Result ? mealCategory : Result.ok(),
            foodQuantity,
            ...ingregientsResult,
            ...preparationStepsResult,
         ]);
         if (combinedResult.isFailure) return Result.fail<Recipe>(combinedResult.err);

         const recipe = new Recipe({
            id: this.dependencies.idGenerator.generate().toValue(),
            props: {
               ...otherProps,
               quantity: foodQuantity.val,
               ingredients: ingregientsResult.map((ingRes) => ingRes.val),
               type: mealType instanceof Result ? mealType.val : mealType,
               category: mealCategory instanceof Result ? mealCategory.val : mealCategory,
               preparationMethod: preparationStepsResult.map((stepRes) => stepRes.val),
            },
         });
         return Result.ok<Recipe>(recipe);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<Recipe>(`[${error.code}]:${error.message}`)
            : Result.fail<Recipe>(`Erreur inattendue. ${Recipe.constructor.name}`);
      }
   }
}
