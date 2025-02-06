export type CreateMealTypeRequest = {
   name: string;
   code: string;
   translate: { [lang: string]: string };
   isSystemType: boolean;
};
