import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { AdvertsInterface } from './adverts.interface';
import { filter, Observable } from 'rxjs';
import { FilterDto } from './dto/filters.dto';

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

  @Post('filters/page/:pageNum')
  async findAllByFilter(
    @Body() filterDto: FilterDto,
    @Param('pageNum') pageNum: string,
  ): Promise<AdvertsInterface[]> {
    try {
      await this.advertService.checkFilter(filterDto);
      return await this.advertService.filterAdvert(
        filterDto,
        parseInt(pageNum, 10),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('page/:pageNum')
  findPage(@Param('pageNum') pageNum: string): Observable<AdvertsInterface[]> {
    try {
      return this.advertService.findPageAdvert(parseInt(pageNum, 10));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('id/:id')
  findOneById(@Param('id') id: string): Observable<AdvertsInterface> {
    return this.advertService.findOneAdvertById(parseInt(id));
  }

  @Get('members/:uuid')
  findAllByUuid(@Param('uuid') uuid: string): Observable<AdvertsInterface[]> {
    return this.advertService.findAllAdvertByUuid(uuid);
  }

  @Get('recent')
  findTopRecent(): Observable<AdvertsInterface[]> {
    return this.advertService.findTop10RecentAdvert();
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
