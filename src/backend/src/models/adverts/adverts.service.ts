import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdvertsEntity } from './adverts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvertsInterface } from './adverts.interface';
import { from, Observable } from 'rxjs';

/**
 * Service to query adverts
 */
@Injectable()
export class AdvertsService {
  constructor(
    @InjectRepository(AdvertsEntity)
    private readonly advertRepository: Repository<AdvertsEntity>,
  ) {}

  createAdvert(advert: AdvertsInterface): Observable<AdvertsInterface> {
    return from(this.advertRepository.save(advert));
  }

  findAllAdvert(): Observable<AdvertsInterface[]> {
    return from(this.advertRepository.find());
  }

  findOneAdvertById(id: number): Observable<AdvertsInterface> {
    return from(this.advertRepository.findOne(id));
  }

  updateAdvert(advert: AdvertsInterface) {
    return from(this.advertRepository.update(advert.id, advert));
  }

  deleteAdvert(id: number) {
    return from(this.advertRepository.delete(id));
  }
}
