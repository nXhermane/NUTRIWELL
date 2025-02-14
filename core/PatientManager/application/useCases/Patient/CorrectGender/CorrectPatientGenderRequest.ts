import { AggregateID } from "@shared";

export type CorrectPatientGenderRequest = {
   patientId: AggregateID;
   gender: "M" | "F" | "O";
};
