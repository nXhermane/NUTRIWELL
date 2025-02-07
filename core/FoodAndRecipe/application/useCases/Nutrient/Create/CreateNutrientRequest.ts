export type CreateNutrientRequest = {
    name: string;
    unit: string;
    code: string;
    tagname: string;
    decimals: number;
    isSystemNutrient: boolean;
    translate: { [lang: string]: string };
}