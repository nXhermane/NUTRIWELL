import {
   AggregateID,
   EmptyStringError,
   Entity,
   ExceptionBase,
   Guard,
   MeasureUnit,
   NegativeValueError,
   NutrientCode,
   NutrientTagname,
   Result,
} from "@shared";
import { CreateNutrientProps } from "./createPropsType";

export interface INutrient {
   code: NutrientCode;
   tagname: NutrientTagname;
   name: string;
   unit: MeasureUnit;
   decimals: number;
}

export class Nutrient extends Entity<INutrient> {
   get code(): string {
      return this.props.code.toString();
   }
   get tagname(): string {
      return this.props.tagname.toString();
   }
   get unit(): string {
      return this.props.unit.toString();
   }
   get decimal(): number {
      return this.props.decimals;
   }
   get name(): string {
      return this.props.name;
   }
   setName(name: string) {
      this.props.name = name;
   }
   setCode(code: NutrientCode) {
      this.props.code = code;
   }
   setTagname(tagname: NutrientTagname) {
      this.props.tagname = tagname;
   }
   setUnit(unit: MeasureUnit) {
      this.props.unit = unit;
   }
   setDecimals(decimals: number) {
      this.props.decimals = decimals;
      this.validate();
   }

   validate(): void {
      this._isValid = false;
      if (Guard.isNegative(this.props.decimals).succeeded) {
         throw new NegativeValueError("The number of decimals of nutrient value must be a positive number.");
      }
      if (Guard.isEmpty(this.props.name).succeeded) {
         throw new EmptyStringError("The name of nutrient must be provided and can't be empty.");
      }
      this._isValid = true;
   }

   static create(createNutrientProps: CreateNutrientProps, id: AggregateID): Result<Nutrient> {
      try {
         const unit = MeasureUnit.create(createNutrientProps.unit);
         const code = NutrientCode.create(createNutrientProps.code);
         const tagname = NutrientTagname.create(createNutrientProps.tagname);
         const combinedResult = Result.combine([unit, code, tagname]);
         if (combinedResult.isFailure) return Result.fail<Nutrient>(combinedResult.err);
         const nutrient = new Nutrient({
            id,
            props: {
               name: createNutrientProps.name,
               code: code.val,
               unit: unit.val,
               decimals: createNutrientProps.decimals,
               tagname: tagname.val,
            },
         });
         return Result.ok<Nutrient>(nutrient);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<Nutrient>(`[${error.code}]:${error.message}`)
            : Result.fail<Nutrient>(`Erreur inattendue. ${Nutrient.constructor.name}`);
      }
   }
}
