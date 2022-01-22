import { ApiProperty } from '@nestjs/swagger';

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
