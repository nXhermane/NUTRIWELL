export interface NutrientDto {
   id: string;
   code: string;
   tagname: string;
   name: string;
   unit: string;
   decimals: number;
   translate: { [lang: string]: string };
   isSystemNutrient: boolean;
}
