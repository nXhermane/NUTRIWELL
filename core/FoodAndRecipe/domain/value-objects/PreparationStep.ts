import {
  EmptyStringError,
  ExceptionBase,
  Guard,
  NegativeValueError,
  Result,
  ValueObject,
} from "@shared";
export interface IPreparationStep {
  stepNumber: number;
  description: string;
  estimatedTime?: number;
}
export class PreparationStep extends ValueObject<IPreparationStep> {
  constructor(props: IPreparationStep) {
    super(props);
  }
  get stepNumber(): number {
    return this.props.stepNumber;
  }
  get description(): string {
    return this.props.description;
  }
  get estimatedTime(): number {
    return this.props?.estimatedTime || 0;
  }
  validate(props: IPreparationStep) {
    if (Guard.isEmpty(props.description).succeeded)
      throw new EmptyStringError(
        "The description of preparation step can't be empty."
      );
    if (Guard.isNegative(props.stepNumber).succeeded)
      throw new NegativeValueError(
        "The step number of preparation step can't be a negative number."
      );
  }
  static create(props: IPreparationStep): Result<PreparationStep> {
    try {
      const step = new PreparationStep(props);
      return Result.ok<PreparationStep>(step);
    } catch (error) {
      return error instanceof ExceptionBase
        ? Result.fail<PreparationStep>(`[${error.code}]:${error.message}`)
        : Result.fail<PreparationStep>(
            `Unexpected Error. ${PreparationStep.constructor.name}`
          );
    }
  }
}
