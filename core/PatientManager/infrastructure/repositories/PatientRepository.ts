import { Paginated, Repository } from "@shared";
import { Patient } from "../../domain";

export interface PatientRepository extends Repository<Patient> {
   getAll(paginated: Paginated): Promise<Patient[]>;
}
