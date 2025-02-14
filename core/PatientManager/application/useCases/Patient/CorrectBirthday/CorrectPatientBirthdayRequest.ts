import { AggregateID } from "@shared";

export type CorrectPatientBirthdayRequest = {
   patientId: AggregateID;
   birthday: string;
};
