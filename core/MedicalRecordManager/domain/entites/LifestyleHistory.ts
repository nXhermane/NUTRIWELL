import { Entity } from "@shared";

export interface ILifestyleHistory {
    physicalActivity
}

export class LifestyleHistory extends Entity<ILifestyleHistory> {
    public validate(): void {
        throw new Error("Method not implemented.");
    }
    
}