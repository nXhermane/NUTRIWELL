import { AggregateID, GenerateUniqueId, handleError, left, Result, right, UseCase } from "@shared";
import { CreateNutrientRequest } from "./CreateNutrientRequest";
import { CreateNutrientResponse } from "./CreteNutrientResponse";
import { NutrientRepository } from "../../../../infrastructure";
import { Nutrient } from "../../../../domain";
//TODO: je dois faire une verification de l'existence d'un nutriment ayant le meme code ou tagname , il peut en exister un en plus celui du system  mais pas trois, je peux essayer d'ajouter cette logique a l'entite nutrient et charger les donnees pour faire la validation dans la methode crete.
export class CreateNutrientUseCase implements UseCase<CreateNutrientRequest, CreateNutrientResponse> {
   constructor(private readonly nutrientRepo: NutrientRepository, private readonly idGenerator: GenerateUniqueId) {}
   async execute(request: CreateNutrientRequest): Promise<CreateNutrientResponse> {
      try {
         const nutrientResult = Nutrient.create(request, this.idGenerator.generate().toValue());
         if (nutrientResult.isFailure) return left(Result.fail<{ id: AggregateID }>(String(nutrientResult.err)));
         nutrientResult.val.created();
         await this.nutrientRepo.save(nutrientResult.val);
         return right(Result.ok<{ id: AggregateID }>({ id: nutrientResult.val.id }));
      } catch (error) {
         return left(handleError(error));
      }
   }
}
