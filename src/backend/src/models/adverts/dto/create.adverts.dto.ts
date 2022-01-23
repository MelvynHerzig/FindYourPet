import { UpdateAdvertDto } from './update.adverts.dto';
import { OmitType } from '@nestjs/swagger';

/**
 * Class that contains all informations to create an advert
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class CreateAdvertDto extends OmitType(UpdateAdvertDto, [
  'id',
] as const) {}
