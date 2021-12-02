import { MembersEntity } from '../members/members.entity';
import { PetGender } from './adverts.entity';
import { SpeciesEntity } from '../species/species.entity';

/**
 * Interface to implement in order to be a submittable as adverts entity
 */
export interface AdvertsInterface {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  lastModified: Date;
  petAge: number;
  petGender: PetGender;
  member: MembersEntity;
  species: SpeciesEntity;
}
