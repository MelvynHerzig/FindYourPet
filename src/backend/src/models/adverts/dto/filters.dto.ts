import { PetGender } from '../entities/adverts.entity';

export class FilterDto {
  // Filter by species
  speciesId: number;

  // Filter by gender
  gender: PetGender;

  // Filter by age
  petMinAge: number;
  petMaxAge: number;

  // Filter by distance (KM)
  radius: number;
}
