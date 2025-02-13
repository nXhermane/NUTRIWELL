import { AggregateID, DomainEvent, DomainEventMessage } from "@shared";

export interface PatientDeletedData {
    patientId: AggregateID
}
@DomainEventMessage("Patient Deleted Event ...",true)
export class PatientDeletedEvent extends DomainEvent<PatientDeletedData> {}