import { Advert, PetGender } from '../entities/adverts.entity';
import { OmitType } from '@nestjs/swagger';

/**
 * Class that contains all informations to update an advert
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class UpdateAdvertDto extends OmitType(Advert, [
  'lastModified',
] as const) {}
