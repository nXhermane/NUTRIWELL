import {
   AggregateID,
   ArgumentOutOfRangeException,
   AuthValueError,
   EmptyStringError,
   Entity,
   ExceptionBase,
   Guard,
   NegativeValueError,
   Result,
} from "@shared";
import { FoodUnitCategory } from "../constants";

/**
 * @NOTE On this FoodUnit , the basical unit is "g" so the conversion factor must convert the present unit to basical unit
 */
export interface IFoodUnit {
   name: string; // Nom de l'unit ex:Cuillere a cafe
   symbol: string;
   category: FoodUnitCategory;
   conversionFactor: number;
   requiresDensity: boolean;
   isSystemUnit: boolean;
}
/**
 * @NOTE On this FoodUnit , the basical unit is "g" so the conversion factor must convert the present unit to basical unit
 */
export class FoodUnit extends Entity<IFoodUnit> {
   get name(): string {
      return this.props.name;
   }
   get symbol(): string {
      return this.props.symbol;
   }
   get category(): FoodUnitCategory {
      return this.props.category;
   }
   get conversionFactor(): number {
      return this.props.conversionFactor;
   }
   get requiresDensity(): boolean {
      return this.props.requiresDensity;
   }
   get isSystemUnit(): boolean {
      return this.props.isSystemUnit;
   }
   setName(name: string) {
      this.verifyFoodUnitCanBeUpdate();
      this.props.name = name;
      this.validate();
   }
   setSymbol(symbol: string) {
      this.verifyFoodUnitCanBeUpdate();
      this.props.symbol = symbol;
      this.validate();
   }
   setCategory(category: FoodUnitCategory) {
      this.verifyFoodUnitCanBeUpdate();
      this.props.category = category;
      this.validate();
   }
   setConversionFactor(factor: number) {
      this.verifyFoodUnitCanBeUpdate();
      this.props.conversionFactor = factor;
      this.validate();
   }
   setRequiresDensity(requiresDensity: boolean) {
      this.verifyFoodUnitCanBeUpdate();
      this.props.requiresDensity = requiresDensity;
      this.validate();
   }
   convertTo(otherUnit: FoodUnit, value: number): number {
      if (Guard.isNegative(value).succeeded) {
         throw new NegativeValueError("Value cannot be negative");
      }
      return (value * this.conversionFactor) / otherUnit.conversionFactor;
   }
   verifyFoodUnitCanBeUpdate() {
      if (this.props.isSystemUnit) throw new AuthValueError("Impossible to modify the system FoodUnit. Clone it to make a change.");
   }
   public validate(): void {
      this._isValid = false;
      if (Guard.isEmpty(this.props.name).succeeded) throw new EmptyStringError("The name of FoodUnit must be empty.");
      if (Guard.isEmpty(this.props.symbol).succeeded) throw new EmptyStringError("the symbol of FoodUnit must be empty.");
      if (Guard.isNegative(this.props.conversionFactor).succeeded) throw new NegativeValueError("The conversion factor can't be a negative number.");
      if (this.props.conversionFactor === 0) throw new ArgumentOutOfRangeException("The conversion Factor must be zero.");
      this._isValid = true;
   }
   static create(props: IFoodUnit, id: AggregateID): Result<FoodUnit> {
      try {
         const foodUnit = new FoodUnit({ id, props });
         return Result.ok<FoodUnit>(foodUnit);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<FoodUnit>(`[${error.code}]:${error.message}`)
            : Result.fail<FoodUnit>(`Erreur inattendue. ${FoodUnit.constructor.name}`);
      }
   }
   override delete(): void {
      this.verifyFoodUnitCanBeUpdate();
      this._isDeleted = true;
   }
}
