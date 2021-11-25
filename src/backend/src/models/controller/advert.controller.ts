import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdvertService } from '../service/advert.service';
import { AdvertInterface } from '../entity/advert.interface';
import { Observable } from 'rxjs';

/**
 * Advert controller
 */
@Controller('advert')
export class AdvertController {
  constructor(private advertService: AdvertService) {}

  @Post()
  create(@Body() advert: AdvertInterface): Observable<AdvertInterface> {
    return this.advertService.createAdvert(advert);
  }

  @Get()
  findAll(): Observable<AdvertInterface[]> {
    return this.advertService.findAllAdvert();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<AdvertInterface> {
    return this.advertService.findOneAdvertById(parseInt(id));
  }

  @Put()
  update(@Body() advert: AdvertInterface) {
    return this.advertService.updateAdvert(advert);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.advertService.deleteAdvert(parseInt(id));
  }
}
