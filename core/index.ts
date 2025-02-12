import * as FoodAndRecipe from "./FoodAndRecipe";
import * as UnitManagement from "./UnitManagement";
import * as Shared from "./shared";
import * as Nutritionist from "./Nutritionist";

// Exporter les modules individuellement pour plus de flexibilité
export { FoodAndRecipe, UnitManagement, Shared, Nutritionist };

// Encapsulation dans un objet immuable
export const Core = { FoodAndRecipe, UnitManagement, Shared, Nutritionist } as const;
