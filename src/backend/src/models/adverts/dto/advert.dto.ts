import { Advert } from '../entities/adverts.entity';
import { TranslatedSpeciesDto } from '../../species/dto/translated.species.dto';
import { PublicMemberDto } from '../../members/dto/public.members.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

/**
 * Class that contains all informations to return from an advert
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class AdvertDto extends OmitType(Advert, ['memberId', 'speciesId']) {
  @ApiProperty({
    description: 'The public information about the owner of the advert',
    type: PublicMemberDto,
    required: false,
  })
  member: PublicMemberDto;

  @ApiProperty({
    description: 'The species of pet translated in the specified language',
    type: TranslatedSpeciesDto,
  })
  species: TranslatedSpeciesDto;

  @ApiProperty({
    description: 'The distance in KM from user position to the advert',
    type: Number,
  })
  distance: number;
}
