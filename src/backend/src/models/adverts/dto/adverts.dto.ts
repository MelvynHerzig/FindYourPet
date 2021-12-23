import { AdvertsEntity, PetGender } from "../adverts.entity";
import { MembersEntity } from "../../members/members.entity";
import { SpeciesEntity } from '../../species/species.entity';
import { AdvertsMemberDto } from '../../members/dto/members.dto';

export class AdvertsDto {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  lastModified: Date;
  petAge: number;
  petGender: PetGender;
  member: AdvertsMemberDto;
  species: SpeciesEntity;
}

export class CreateAdvertsDto {
  id: number;
  title: string;
  description: string;
  petAge: number;
  petGender: PetGender;
  memberId: number;
  speciesId: number;
}


