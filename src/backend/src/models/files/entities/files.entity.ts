import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class File {
  @ApiProperty({
    description: 'The id of the file',
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The filename of the file',
    type: String,
    example: 'myImage.png',
  })
  @Column()
  filename: string;

  @ApiProperty({
    description: 'The path of the file',
    type: String,
    example: '/uploads/myImage.png',
  })
  @Column()
  path: string;

  @ApiProperty({
    description: 'The mimetype of the file',
    type: String,
    example: 'image/png',
  })
  @Column()
  mimetype: string;
}
