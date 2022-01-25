import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { File } from './entities/files.entity';
import { ERROR_NOT_AUTHORIZED } from '../../error/error-message';

@ApiTags('files')
@Controller('files')
/**
 * Controller for the files
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class FilesController {
  constructor(
    private advertService: AdvertsService,
    private fileService: FilesService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of the advert for which the upload is done',
  })
  @ApiBody({
    description: 'Image to upload for the specified advert',
  })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    description: 'The image is successfully uploaded and linked to the advert',
    type: File,
  })
  @ApiBadRequestResponse({
    description: 'The body or the parameter is invalid',
  })
  @ApiUnauthorizedResponse({
    description: 'The JWT of the logged member is missing',
  })
  @ApiBearerAuth()
  @Post('adverts/:id')
  @UseInterceptors(FileInterceptor('image', { dest: './files' }))
  @UseGuards(AuthGuard('jwt'))
  async upload(
    @Param('id') id,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ): Promise<File> {
    try {
      const ability = this.caslAbilityFactory.createForMember(req.user);
      if (
        ability.can(
          Action.Update,
          await this.advertService.findOneAdvertById(id),
        )
      ) {
        return await this.fileService.updateImage(id, {
          id: undefined,
          filename: file.filename,
          mimetype: file.mimetype,
          path: file.path,
        });
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }

    throw new HttpException(ERROR_NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of the image to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The image corresponding to the specified id',
  })
  @ApiBadRequestResponse({
    description: 'The parameter is invalid',
  })
  @Get(':id')
  async getFile(
    @Param('id') id: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    try {
      const file = await this.fileService.getImage(id);

      const stream = createReadStream(join(process.cwd(), file.path));

      response.set({
        'Content-Disposition': `inline; filename="${file.filename}"`,
        'Content-Type': file.mimetype,
      });
      return new StreamableFile(stream);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
