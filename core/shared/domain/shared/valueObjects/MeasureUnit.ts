import { Guard, Result } from "../../../core";
import { EmptyStringError, ExceptionBase } from "../../../exceptions";
import { DomainPrimitive, ValueObject } from "../../common";

export class MeasureUnit extends ValueObject<string> {
  constructor(unit: string) {
    super({ _value: unit });
  }
  protected validate(props: Readonly<DomainPrimitive<string>>): void {
    if (Guard.isEmpty(props._value).succeeded)
      throw new EmptyStringError("L'unite de mesure ne peut etre vide.");
  }
  toString(): string {
    return this.props._value;
  }
  static create(unit: string): Result<MeasureUnit> {
    try {
      const measureUnit = new MeasureUnit(unit);
      return Result.ok<MeasureUnit>(measureUnit);
    } catch (e) {
      return e instanceof ExceptionBase
        ? Result.fail<MeasureUnit>(`[${e.code}]:${e.message}`)
        : Result.fail<MeasureUnit>(
            `Unexpected Error. ${MeasureUnit?.constructor.name}`
          );
    }
  }
}
