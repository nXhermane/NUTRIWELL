import { EmptyStringError, Entity, ExceptionBase, GenerateUniqueId, Guard, Result } from "@shared";


export interface IMealType {
  name: string;
  code: string;
}
//TODO: Je peux venir faire une implementation supplementaire , le cas ou les names change , I think about DomainEvent
export class MealType extends Entity<IMealType> {
  public validate(): void {
    this._isValid = false;
    if (Guard.isEmpty(this.props.code).succeeded)throw new EmptyStringError("The code of mealtype can't be empty. Please give a correct code to MealType");
    if (Guard.isEmpty(this.props.name).succeeded)throw new EmptyStringError("The name of mealtype can't be empty. Please give a correct name to MealType");
    this._isValid = true;
  }
  setName(name: string) {
    this.props.name = name;
    this.validate();
  }
  setCode(code: string){
    this.props.code = code 
    this.validate()
  }

  static create(props: IMealType,generateUnitqueId: GenerateUniqueId): Result<MealType> {
    try {
      const mealId = generateUnitqueId.generate().toValue();
      const mealType = new MealType({ props, id: mealId });
      return Result.ok<MealType>(mealType);
    } catch (error) {
      return error instanceof ExceptionBase
        ? Result.fail<MealType>(`[${error.code}]:${error.message}`)
        : Result.fail<MealType>(
            `Erreur inattendue. ${MealType.constructor.name}`
          );
    }
  }
}
