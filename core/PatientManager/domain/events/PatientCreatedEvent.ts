import { AggregateID, DomainEvent, DomainEventMessage } from "@shared";

export interface PatientCreatedData {
   patientId: AggregateID;
   name: string;
   age: number;
   gender: "M" | "F" | "O";
}
@DomainEventMessage("Patient Created Event", true)
export class PatientCreatedEvent extends DomainEvent<PatientCreatedData> {}
