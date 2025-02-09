import { IAddress } from "@shared";

export interface CreateConsultationPlaceProps {
   name: string;
   type: "online" | "offline";
   address: IAddress;
   contact: {
      email: string;
      phoneNumber: string;
   };
}
