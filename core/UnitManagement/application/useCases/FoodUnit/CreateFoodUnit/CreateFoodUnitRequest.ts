export type CreateFoodUnitRequest = {
   name: string; // Nom de l'unit ex:Cuillere a cafe
   symbol: string;
   category: "weight" | "volume" | "piece";
   conversionFactor: number;
   requiresDensity: boolean;
   isSystemUnit: boolean;
};
