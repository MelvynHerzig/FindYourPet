import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import {
  Action,
  CaslAbilityFactory,
} from '../../security/casl/casl-ability.factory';
import { AdvertsService } from '../adverts/adverts.service';

@Controller('files')
export class FilesController {
  constructor(
    private advertService: AdvertsService,
    private fileService: FilesService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post('adverts/:id')
  @UseInterceptors(FileInterceptor('file', { dest: './files' }))
  @UseGuards(AuthGuard('jwt'))
  async upload(
    @Param('id') id,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    const ability = this.caslAbilityFactory.createForMember(req.user);
    if (
      ability.can(Action.Update, await this.advertService.findOneAdvertById(id))
    ) {
      return await this.fileService.updateImage(id, {
        id: undefined,
        filename: file.filename,
        mimetype: file.mimetype,
        path: file.path,
      });
    }

    throw new UnauthorizedException();
  }

  @Get(':id')
  async getFile(
    @Param('id') id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.fileService.getImage(id);

    const stream = createReadStream(join(process.cwd(), file.path));

    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    });
    return new StreamableFile(stream);
  }
}
