import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/files.entity';
import { Repository } from 'typeorm';
import { AdvertsService } from '../adverts/adverts.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly filesRepository: Repository<File>,
    private advertService: AdvertsService,
  ) {}

  async updateImage(advertId: number, file: File): Promise<File> {
    const newFile = await this.filesRepository.create(file);
    await this.filesRepository.save(newFile);

    const advert = await this.advertService.findOneAdvertById(advertId);

    advert.imageId = newFile.id;

    await this.advertService.updateAdvert(this.advertService.ToAdvert(advert));

    return newFile;
  }

  async getImage(id: number): Promise<File> {
    const file = await this.filesRepository.findOne(id);
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
