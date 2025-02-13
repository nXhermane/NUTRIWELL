import { AggregateRoot, HumanName, Gender, Contact, Address, Birthday, ArgumentInvalidException, IAddress, Guard, EmptyStringError } from "@shared";
import { PatientBirthdayCorrectedEvent, PatientCreatedEvent, PatientDeletedEvent, PatientGenderCorrectedEvent } from "../events";

export interface IPatient {
   name: HumanName;
   gender: Gender;
   contact: Contact;
   address: Address;
   birthday: Birthday;
   occupation?: string;
}
export class Patient extends AggregateRoot<IPatient> {
   get name(): string {
      return this.props.name.toString();
   }

   get gender(): "M" | "F" | "O" {
      return this.props.gender.sexe;
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

   get birthday(): string {
      return this.props.birthday.toString();
   }

   get occupation(): string | undefined {
      return this.props.occupation;
   }

   get age(): number {
      return this.props.birthday.getAge();
   }
   changeName(name: HumanName) {
      this.props.name = name;
   }
   changeGender(gender: Gender) {
      this.props.gender = gender;
      this.addDomainEvent(new PatientGenderCorrectedEvent({ patientId: this.id, gender: this.gender }));
   }
   changeContact(contact: Contact) {
      this.props.contact = contact;
   }
   changeAddress(address: Address) {
      this.props.address = address;
   }
   changeBirthday(birthday: Birthday) {
      this.props.birthday = birthday;
      this.addDomainEvent(new PatientBirthdayCorrectedEvent({ patientId: this.id, birthday: this.birthday, age: this.age }));
   }
   changeOccupation(occupation: string) {
      if (Guard.isEmpty(occupation).succeeded) throw new EmptyStringError("The occupation of patient can't be empty.");
      this.props.occupation = occupation;
   }

   isMale(): boolean {
      return this.props.gender.isMale();
   }

   isFemale(): boolean {
      return this.props.gender.isFemale();
   }

   validate(): void {
      this._isValid = false;
      if (this.props.occupation && Guard.isEmpty(this.props.occupation).succeeded)
         throw new EmptyStringError("The occupation of patient can't be empty when it is provided.");
      this._isValid = true;
   }
   override created(): void {
      this.addDomainEvent(new PatientCreatedEvent({ patientId: this.id, name: this.name, age: this.age, gender: this.gender }));
   }
   override delete(): void {
      this.addDomainEvent(new PatientDeletedEvent({ patientId: this.id }));
      super.delete();
   }
}
