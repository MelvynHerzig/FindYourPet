import { Species } from '../entities/species.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';

/**
 * Class that contains all informations to return a translated species
 * @author Alec Berney, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class TranslatedSpeciesDto extends PickType(Species, ['id', 'name']) {
  @ApiProperty({
    description: 'The name of the species translated in the specified language',
    type: String,
    example: 'Chat',
  })
  name: string;
}
