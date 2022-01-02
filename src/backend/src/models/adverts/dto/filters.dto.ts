import { PetGender } from '../adverts.entity';

export class FilterDto {
  // Filter by species
  speciesId: number;

  // Filter by gender
  gender: PetGender;

  // Filter by age
  petMinAge: number;

  // Filter by distance (KM)
  radius: number;
}
