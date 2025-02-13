import { AggregateID, DomainEvent, DomainEventMessage } from "@shared";

export interface PatientBirthdayCorrectedData {
   patientId: AggregateID;
   birthday: string;
   age: number;
}
@DomainEventMessage("Patient Birthday Corrected Event", true)
export class PatientBirthdayCorrectedEvent extends DomainEvent<PatientBirthdayCorrectedData> {}