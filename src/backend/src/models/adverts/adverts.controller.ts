import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { AdvertsInterface } from './adverts.interface';
import { Observable } from 'rxjs';
import {
  CreateAdvertsPolicyhandler,
  DeleteAdvertsPolicyhandler,
  UpdateAdvertsPolicyhandler,
} from '../../security/policy/handler/adverts.policyhandler';
import {
  CheckPolicies,
  PoliciesGuard,
} from '../../security/policy/policy.guard';
import { AdvertsDto } from './dto/adverts.dto';
import { AuthGuard } from '@nestjs/passport';

/**
 * Advert controller
 */
@Controller('adverts')
export class AdvertsController {
  constructor(private advertService: AdvertsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new CreateAdvertsPolicyhandler())
  create(@Body() advert: AdvertsInterface): Observable<AdvertsDto> {
    return this.advertService.createAdvert(advert);
  }

  @Get('/:lang')
  findAll(): Observable<AdvertsDto[]> {
    return this.advertService.findAllAdvert();
  }

  @Get(':id/:lang')
  findOneById(
    @Param('id') id: string,
    @Param('lang') lang: string,
  ): Observable<AdvertsDto> {
    return this.advertService.findOneAdvertById(parseInt(id));
  }

  @Get('members/:uuid/:lang')
  findAllByUuid(
    @Param('uuid') uuid: string,
    @Param('lang') lang: string,
  ): Observable<AdvertsDto[]> {
    return this.advertService.findAllAdvertByUuid(uuid);
  }

  @Put()
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new UpdateAdvertsPolicyhandler())
  update(@Body() advert: AdvertsInterface) {
    return this.advertService.updateAdvert(advert);
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new DeleteAdvertsPolicyhandler())
  deleteOne(@Param('id') id: string) {
    return this.advertService.deleteAdvert(parseInt(id));
  }
}
