import { Entity, EmptyStringError, Guard, GenerateUniqueId, Result, ExceptionBase } from "@shared";

export interface IFoodGroup {
   code: string;
   name: string;
   description?: string;
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
   setName(value: string) {
      this.props.name = value;
      this.validate();
   }
   setCode(code: string) {
      this.props.code = code;
   }
   setDescription(desc: string) {
      this.props.description = desc;
   }

   validate(): void {
      this._isValid = false;
      if (Guard.isEmpty(this.props.code).succeeded) throw new EmptyStringError("The code of foodGroup must be provided and can't be empty.");
      if (Guard.isEmpty(this.props.name).succeeded) throw new EmptyStringError("The name of foodGroup must be provided and can't be empty.");
      this._isValid = true;
   }

   static create(createFoodGroupProps: IFoodGroup, generateUnitqueId: GenerateUniqueId): Result<FoodGroup> {
      try {
         const id = generateUnitqueId.generate().toValue();
         const foodGroup = new FoodGroup({ id, props: createFoodGroupProps });

         return Result.ok<FoodGroup>(foodGroup);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<FoodGroup>(`[${error.code}]:${error.message}`)
            : Result.fail<FoodGroup>(`Erreur inattendue. ${FoodGroup.constructor.name}`);
      }
   }
}
