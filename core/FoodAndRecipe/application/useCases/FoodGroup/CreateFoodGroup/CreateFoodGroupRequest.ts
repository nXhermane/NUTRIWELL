export type CreateFoodGroupRequest = {
   code: string;
   name: string;
   description?: string;
   translate: { [lang: string]: string };
   isSystemGroup: boolean;
};
