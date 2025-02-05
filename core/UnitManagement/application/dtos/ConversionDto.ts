import { AggregateID } from "@shared";

export interface ConvertValueDto {
    value: number;
    unitIdOrSymbol: AggregateID;
 }
 export interface ConvertedValueDto {
    value: number;
    fromUnitId: AggregateID;
    unitId: AggregateID;
 }
 