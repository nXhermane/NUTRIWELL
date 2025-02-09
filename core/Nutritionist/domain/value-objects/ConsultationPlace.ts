import {
   Address,
   AggregateID,
   Contact,
   EmptyStringError,
   Guard,
   handleError,
   IAddress,
   Result,
   ValueObject,
} from "@shared";
import { CreateConsultationPlaceProps } from "./createPropsType";

export enum ConsultationPlaceType {
   OnLine = "online",
   OffLine = "offline",
}
export interface IConsultationPlace {
   name: string;
   type: ConsultationPlaceType;
   address: Address;
   contact: Contact;
}

export class ConsultationPlace extends ValueObject<IConsultationPlace> {
   get name(): string {
      return this.props.name;
   }
   get type(): ConsultationPlaceType {
      return this.props.type;
   }
   get contact(): { email: string; phoneNumber: string } {
      const { email, phoneNumber } = this.props.contact;
      return { email, phoneNumber };
   }
   get address(): IAddress {
      return this.props.address.unpack();
   }

   public validate(): void {
      if (Guard.isEmpty(this.props.name).succeeded) throw new EmptyStringError("The consultation Place name can't be empty.");
   }
   static create(createProps: CreateConsultationPlaceProps): Result<ConsultationPlace> {
      try {
         const addressResult = Address.create(createProps.address);
         const contactResult = Contact.create(createProps.contact);
         const combinedResult = Result.combine([addressResult, contactResult]);
         if (combinedResult.isFailure) return Result.fail<ConsultationPlace>(String(combinedResult.err));
         const consultationPlace = new ConsultationPlace({
            name: createProps.name,
            type: createProps.type as ConsultationPlaceType,
            address: addressResult.val,
            contact: contactResult.val,
         });
         return Result.ok<ConsultationPlace>(consultationPlace);
      } catch (error) {
         return handleError(error);
      }
   }
}
