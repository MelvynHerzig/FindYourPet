import { ApiProperty } from '@nestjs/swagger';

/**
 * A simple class for response when register
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class RegistrationsStatus {
  @ApiProperty({
    description: 'Status of the registration',
    type: Boolean,
    example: true,
  })
  success: boolean;
  @ApiProperty({
    description: 'Message corresponding to the status',
    type: String,
    example: 'member registered',
  })
  message: string;
}
