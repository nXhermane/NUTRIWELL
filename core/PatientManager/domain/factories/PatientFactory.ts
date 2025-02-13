import { Address, Birthday, Contact, Factory, Gender, GenerateUniqueId, handleError, HumanName, Result } from "@shared";
import { Patient } from "../aggregates";
import { CreatePatientProps } from "./factoriesProps/PatientFactoryProps";

export class PatientFactory implements Factory<CreatePatientProps, Patient> {
   constructor(private readonly idGenerator: GenerateUniqueId) {}
   create(props: CreatePatientProps): Result<Patient> {
      try {
         const humanName = HumanName.create(props.name);
         const gender = Gender.create(props.gender);
         const birthday = Birthday.create(props.birthday);
         const contact = Contact.create({ email: props.contact.email, phoneNumber: props.contact.phone });
         const address = Address.create(props.address);
         const combinedResult = Result.combine([humanName, gender, birthday, contact, address]);
         if (combinedResult.isFailure) return Result.fail(combinedResult.err);
         const patient = new Patient({
            id: this.idGenerator.generate().toValue(),
            props: {
               name: humanName.val,
               gender: gender.val,
               birthday: birthday.val,
               address: address.val,
               contact: contact.val,
               occupation: props.occupation,
            },
         });
         return Result.ok(patient);
      } catch (error) {
         return handleError(error);
      }
   }
}
