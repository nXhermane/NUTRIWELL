import { Email, Repository } from "@shared";
import { Nutritionist } from "../../domain/aggregate";

export interface NutritionistRepository extends Repository<Nutritionist> {
   /**
    * Check if nutritionist exist with a giving email
    * @param email Nutritionist email
    * @returns Return {true} when a nutritionist exist with this email if not {false}
    */
   checkIfNutritionistWithEmailExist(email: Email): Promise<boolean>;
   getByEmail(email: Email): Promise<Nutritionist>;
   getAll(): Promise<Nutritionist[]>
}
