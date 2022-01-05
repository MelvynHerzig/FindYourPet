import { Advert } from '../entities/adverts.entity';
import { OmitType } from '@nestjs/mapped-types';
import { TranslatedSpeciesDto } from '../../species/dto/translated.species.dto';
import { PublicMemberDto } from '../../members/dto/public.members.dto';

export class AdvertDto extends OmitType(Advert, ['memberId', 'speciesId']) {
  member: PublicMemberDto;
  species: TranslatedSpeciesDto;
}
