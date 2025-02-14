import { AggregateID, IAddress } from "@shared";

export type UpdatePatientRequest = {
   patientId: AggregateID;
   data: Partial<{
      name: string;
      contact: Partial<{ email: string; phone: string }>;
      address: Partial<IAddress>;
      occupation: string;
   }>;
};
