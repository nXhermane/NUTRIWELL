import { Address, Birthday, Contact, Email, Factory, Gender, GenerateUniqueId, handleError, HumanName, Result } from "@shared";
import { CreateNutritionistProps } from "./createNutritionistProps";
import { Nutritionist } from "../aggregate";
import { ConsultationPlace, NutritionAreaOfExpertise } from "../value-objects";

export class NutritionistFactory implements Factory<CreateNutritionistProps, Nutritionist> {
   constructor(private readonly idGenerator: GenerateUniqueId) {}
   create(props: CreateNutritionistProps): Result<Nutritionist> {
      try {
         const humanNameResult = HumanName.create(props.name);
         const emailResult = Email.create(props.email);
         const birthdayResult = Birthday.create(props.birthday);
         const genderResult = Gender.create(props.gender);
         const addressResult = Address.create(props.address);
         const contactResult = Contact.create({
            email: props.contact.email || props.email,
            phoneNumber: props.contact.phomeNumber,
         });
         const consultationPlaceResults = props.consultationPlace.map((consultationPlace) => ConsultationPlace.create(consultationPlace));
         const nutrtionAreaOfExpertiseResults = props.nutritionAreaOfExpertises.map((nutAreaExpertise) =>
            NutritionAreaOfExpertise.create(nutAreaExpertise),
         );

         const combinedResult = Result.combine([
            humanNameResult,
            emailResult,
            birthdayResult,
            genderResult,
            addressResult,
            contactResult,
            ...consultationPlaceResults,
            ...nutrtionAreaOfExpertiseResults,
         ]);
         if (combinedResult.isFailure) return Result.fail<Nutritionist>(combinedResult.err);
         const nutritionist = new Nutritionist({
            id: this.idGenerator.generate().toValue(),
            props: {
               name: humanNameResult.val,
               email: emailResult.val,
               gender: genderResult.val,
               birthday: birthdayResult.val,
               address: addressResult.val,
               contact: contactResult.val,
               consultationPlaces: consultationPlaceResults.map((consultationPlaceResult) => consultationPlaceResult.val),
               nutrtionAreaOfExpertises: nutrtionAreaOfExpertiseResults.map((nutritionAreaOfExpertiseResult) => nutritionAreaOfExpertiseResult.val),
            },
         });
         return Result.ok<Nutritionist>(nutritionist);
      } catch (error) {
         return handleError(error);
      }
   }
}
