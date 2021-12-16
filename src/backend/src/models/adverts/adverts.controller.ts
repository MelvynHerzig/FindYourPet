import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UseGuards,
} from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { AdvertsInterface } from './adverts.interface';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

/**
 * Advert controller
 */
@Controller('adverts')
export class AdvertsController {
  constructor(private advertService: AdvertsService) {}

  @Post()
  create(@Body() advert: AdvertsInterface): Observable<AdvertsInterface> {
    return this.advertService.createAdvert(advert);
  }

  @Get()
  findAll(): Observable<AdvertsInterface[]> {
    return this.advertService.findAllAdvert();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Observable<AdvertsInterface> {
    return this.advertService.findOneAdvertById(parseInt(id));
  }

  @Get('members/:uuid')
  findAllByUuid(@Param('uuid') uuid: string): Observable<AdvertsInterface[]> {
    return this.advertService.findAllAdvertByUuid(uuid);
  }

  @Put()
  update(@Body() advert: AdvertsInterface) {
    return this.advertService.updateAdvert(advert);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.advertService.deleteAdvert(parseInt(id));
  }
}
