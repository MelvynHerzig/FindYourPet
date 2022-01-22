import { ApiProperty } from '@nestjs/swagger';

export const RESPONSE_ADVERT_UPDATED = 'advert updated';
export const RESPONSE_ADVERT_DELETED = 'advert deleted';

export const RESPONSE_MEMBER_UPDATED = 'member updated';
export const RESPONSE_MEMBER_DELETED = 'member deleted';

export const RESPONSE_SPECIES_UPDATED = 'species updated';
export const RESPONSE_SPECIES_DELETED = 'species deleted';

export class HttpResponse {
  @ApiProperty({
    description: 'Status of the response',
    type: Boolean,
    example: true,
  })
  success: boolean;
  @ApiProperty({
    description: 'Message corresponding to the status',
    type: String,
    example: RESPONSE_ADVERT_UPDATED,
  })
  message: string;
}
