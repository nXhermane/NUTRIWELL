export type CreateMealCategoryRequest = {
   name: string;
   code: string;
   translate: { [lang: string]: string };
   isSystemCategory: boolean;
};
