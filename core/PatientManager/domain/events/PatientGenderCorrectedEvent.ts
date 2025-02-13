import { AggregateID, DomainEvent, DomainEventMessage } from "@shared";

export interface PatientGenderCorrectedData {
   patientId: AggregateID;
   gender: "M" | "F" | "O";
}

@DomainEventMessage("Patient Gender Corrected Event.", true)
export class PatientGenderCorrectedEvent extends DomainEvent<PatientGenderCorrectedData> {}
