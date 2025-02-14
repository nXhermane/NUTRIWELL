import { Address, ApplicationMapper, Contact, handleError, HumanName, left, Result, right, UseCase } from "@shared";
import { UpdatePatientRequest } from "./UpdatePatientRequest";
import { UpdatePatientResponse } from "./UpdatePatientResponse";
import { PatientRepository } from "../../../../infrastructure";
import { Patient } from "../../../../domain";
import { PatientDto } from "../../../dtos";

export class UpdatePatientUseCase implements UseCase<UpdatePatientRequest, UpdatePatientResponse> {
   constructor(private readonly patientRepo: PatientRepository, private readonly mapper: ApplicationMapper<Patient, PatientDto>) {}
   async execute(request: UpdatePatientRequest): Promise<UpdatePatientResponse> {
      try {
         const patient = await this.patientRepo.getById(request.patientId);
         const updateResult = this.updatePatient(request.data, patient);
         if (updateResult.isFailure) return left(updateResult);
         const patientDto = this.mapper.toResponse(patient);
         return right(Result.ok<PatientDto>(patientDto));
      } catch (error) {
         return left(handleError(error));
      }
   }

   private updatePatient(data: UpdatePatientRequest["data"], patient: Patient): Result<any> {
      try {
         // Update Name
         if (data.name) {
            const name = HumanName.create(data.name);
            if (name.isFailure) return name;
            patient.changeName(name.val);
         }
         // Update Occupation
         if (data.occupation) patient.changeOccupation(data.occupation);
         // Update Contact
         if (data.contact) {
            const prevContact = patient.contact;
            const newContact = Contact.create({
               email: data.contact.email ? data.contact.email : prevContact.email,
               phoneNumber: data.contact.phone ? data.contact.phone : prevContact.phoneNumber,
            });
            if (newContact.isFailure) return newContact;
            patient.changeContact(newContact.val);
         }
         // Update Address
         if (data.address) {
            const prevAddress = patient.address;
            const newAddress = Address.create({
               country: data.address.country ? data.address.country : prevAddress.country,
               city: data.address.city ? data.address.city : prevAddress.city,
               postalCode: data.address.postalCode ? data.address.postalCode : prevAddress.postalCode,
               street: data.address.street ? data.address.street : prevAddress.street,
            });
            if (newAddress.isFailure) return newAddress;
            patient.changeAddress(newAddress.val);
         }
         return Result.ok();
      } catch (error) {
         return handleError(error);
      }
   }
}
