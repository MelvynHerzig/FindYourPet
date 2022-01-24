import { ApiProperty } from '@nestjs/swagger';

/**
 * A simple class for response when login
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
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
