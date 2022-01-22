import { ApiProperty } from '@nestjs/swagger';

export class LoginStatus {
  @ApiProperty({
    description: 'UUID of the member authentified',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Email of the authentified member',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Access token for the authentified member',
    type: String,
  })
  accessToken: string;

  @ApiProperty({
    description: 'Expiration of the access token',
    type: String,
  })
  expiresIn: string;
}
