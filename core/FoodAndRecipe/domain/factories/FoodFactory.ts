import { AggregateID, ExceptionBase, Factory, GenerateUniqueId, Guard, Result } from "@shared";
import { CreateFoodProps } from "./factoriesProps";
import { Food } from "../aggregates";
import { FoodGroupRepository, NutrientRepository } from "../../infrastructure";
import { FoodQuantity, NutrientAmount } from "../value-objects";
import { FoodGroup, IFoodGroup } from "../entities";
import { FoodUnitManagerALC } from "../../application/ACL";

export interface FoodFactoryDependencies {
   idGenerator: GenerateUniqueId;
   foodUnitManagerALC: FoodUnitManagerALC;
   nutrientRepo: NutrientRepository;
   foodGroupRepo: FoodGroupRepository;
}
export class FoodFactory implements Factory<CreateFoodProps, Food> {
   constructor(private dependencies: FoodFactoryDependencies) {}
   async create(props: CreateFoodProps): Promise<Result<Food>> {
      try {
         const { quantity, nutrients, group, ...otherProps } = props;
         const availbleUnits = await this.dependencies.foodUnitManagerALC.getFoodAvailableUnit();
         const foodQuantity = FoodQuantity.create(quantity, availbleUnits);
         const supportedNutrientIds = await this.dependencies.nutrientRepo.getAllId();
         const nutrientAmouts = nutrients.map((createNutrientProps) => NutrientAmount.create(createNutrientProps, supportedNutrientIds));
         // soit le user founi le Id du FoodGroup si le group exist et si non en creer un nouveau
         const foodGroup = !Guard.isObject(group).succeeded
            ? await this.dependencies.foodGroupRepo.getById(group as AggregateID)
            : FoodGroup.create(group as IFoodGroup, this.dependencies.idGenerator.generate().toValue());

         const combinedResult = Result.combine([foodQuantity, ...nutrientAmouts, foodGroup instanceof Result ? foodGroup : Result.ok()]);
         if (combinedResult.isFailure) return Result.fail<Food>(combinedResult.err);
         const foodId = this.dependencies.idGenerator.generate().toValue();
         const food = new Food({
            id: foodId,
            props: {
               ...otherProps,
               group: foodGroup instanceof Result ? foodGroup.val : foodGroup,
               quantity: foodQuantity.val,
               nutrients: nutrientAmouts.map((nutRes) => nutRes.val),
            },
         });
         return Result.ok<Food>(food);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<Food>(`[${error.code}]:${error.message}`)
            : Result.fail<Food>(`Erreur inattendue. ${Food.constructor.name}`);
      }
   }
}
