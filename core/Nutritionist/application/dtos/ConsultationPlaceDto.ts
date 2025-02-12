export interface ConsultationPlaceDto {
   name: string;
   type: "online" | "offline";
   contact: {
      email: string;
      phoneNumber: string;
   };
   address: {
      street?: string;
      city?: string;
      postalCode?: string;
      country: string;
   };
}
