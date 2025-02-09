import {
   Address,
   AggregateRoot,
   ArgumentInvalidException,
   Birthday,
   Contact,
   Email,
   Gender,
   HumanName,
   IAddress,
} from "@shared";
import { ConsultationPlace, IConsultationPlace, INutritionAreaOfExpertise, NutritionAreaOfExpertise } from "../value-objects";

export interface INutritionist {
   name: HumanName;
   email: Email;
   contact: Contact;
   address: Address;
   birthday: Birthday;
   gender: Gender;
   nutrtionAreaOfExpertises: NutritionAreaOfExpertise[];
   consultationPlaces: ConsultationPlace[];
}

export class Nutritionist extends AggregateRoot<INutritionist> {
   get name(): string {
      return this.props.name.fullName;
   }
   get email(): string {
      return this.props.email.toString();
   }
   get contact(): { email: string; phoneNumber: string } {
      return {
         email: this.props.contact.email.toString(),
         phoneNumber: this.props.contact.phoneNumber.toString(),
      };
   }
   get address(): IAddress {
      return this.props.address.unpack();
   }
   get gender(): "M" | "F" | "O" {
      return this.props.gender.sexe;
   }
   get birthday(): string {
      return this.props.birthday.toString();
   }
   get nutritionAreaOfExpertise(): INutritionAreaOfExpertise[] {
      return this.props.nutrtionAreaOfExpertises.map((specility) => specility.unpack());
   }
   get consultationPlaces(): IConsultationPlace[] {
      return this.props.consultationPlaces.map((consultationPlace) => consultationPlace.unpack());
   }
   changeName(name: HumanName) {
      this.props.name = name;
      this.validate();
   }

   changeEmail(email: Email) {
      this.props.email = email;
      this.validate();
   }

   changeGender(gender: Gender) {
      this.props.gender = gender;
      this.validate();
   }

   changeContact(contact: Contact) {
      this.props.contact = contact;
   }

   changeAddress(address: Address) {
      this.props.address = address;
   }

   changeBirthday(birthday: Birthday) {
      this.props.birthday = birthday;
      this.validate();
   }

   addNutritionAreaOfExpertise(...nutrtionAreaOfExpertises: NutritionAreaOfExpertise[]) {
      for (const nutrtionAreaOfExpertise of nutrtionAreaOfExpertises) {
         const index = this.props.nutrtionAreaOfExpertises.findIndex((nutritionAreaOfE) => nutritionAreaOfE.equals(nutrtionAreaOfExpertise));
         if (index != -1) this.props.nutrtionAreaOfExpertises[index] = nutrtionAreaOfExpertise;
         else this.props.nutrtionAreaOfExpertises.push(nutrtionAreaOfExpertise);
      }
      this.validate();
   }

   addConsultationPlace(...consultationPlaces: ConsultationPlace[]) {
      for (const consultationPlace of consultationPlaces) {
         const index = this.props.consultationPlaces.findIndex((constPlace) => constPlace.equals(consultationPlace));
         if (index == -1) this.props.consultationPlaces.push(consultationPlace);
         else this.props.consultationPlaces[index] = consultationPlace;
      }
      this.validate();
   }
   removeConsultationPlace(consultationPlace: ConsultationPlace) {
      const consultationPlaceIndex = this.props.consultationPlaces.findIndex((consultPlace) => consultPlace.equals(consultationPlace));
      if (consultationPlaceIndex != -1) this.props.consultationPlaces.splice(consultationPlaceIndex, 1);
      this.validate();
   }
   removeNutritionAreaOfExpertise(nutritionAreaOfExpertise: NutritionAreaOfExpertise) {
      const nutritionAreaOfExpertiseIndex = this.props.nutrtionAreaOfExpertises.findIndex((nutAreaOfExp) =>
         nutAreaOfExp.equals(nutritionAreaOfExpertise),
      );
      if (nutritionAreaOfExpertiseIndex != -1) this.props.nutrtionAreaOfExpertises.splice(nutritionAreaOfExpertiseIndex, 1);
      this.validate();
   }

   validate(): void {
      if (!this.props.name.isValid()) throw new ArgumentInvalidException("The nutritionist name must be a valid name.");
      if (!this.props.email.isValid()) throw new ArgumentInvalidException("The nutritionist email must be valid email.");
      if (!this.props.contact.isValid()) throw new ArgumentInvalidException("Le contact du nutritionniste n'est pas valide.");
      if (!this.props.address.isValid()) throw new ArgumentInvalidException("L'address du nutritionniste n'est pas valide.");
      if (!this.props.birthday.isValid()) throw new ArgumentInvalidException("La date de naissance du nutritionniste n'est pas valide.");

      this._isValid = true;
   }
}
