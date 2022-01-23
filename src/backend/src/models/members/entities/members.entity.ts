import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Point } from 'geojson';
import { IsEmail, IsInt, IsNotEmpty, IsPostalCode } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Advert } from '../../adverts/entities/adverts.entity';

/**
 * Entity to represents a user of FindYourPet
 */
@Entity('member')
export class Member {
  @ApiProperty({
    description: 'The uuid of the member',
    type: String,
    example: '470fe268-1b5f-46ea-a711-32488df85fd0',
  })
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The firstname of the member',
    type: String,
    example: 'John',
  })
  @IsNotEmpty()
  @Column()
  firstname: string;

  @ApiProperty({
    description: 'The name of the member',
    type: String,
    example: 'Doe',
  })
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty({
    description: 'The email of the member.',
    type: String,
    example: 'john@doe.ch',
  })
  @IsEmail()
  @Column({
    unique: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of the member',
    type: String,
    example: 'My1stSuperP@assword',
  })
  @Column({
    length: 60,
  })
  password: string;

  @ApiProperty({
    description: "The street of the member's address",
    type: String,
    example: 'Route de Cheseaux 1',
  })
  @IsNotEmpty()
  @Column()
  street: string;

  @ApiProperty({
    description: "The NPA of the member's address",
    type: Number,
    example: '1400',
  })
  @IsInt()
  @Column()
  NPA: number;

  @ApiProperty({
    description: "The city of the member's address",
    type: String,
    example: 'Yverdon-les-Bains',
  })
  @IsNotEmpty()
  @Column()
  city: string;

  @ApiProperty({
    description: 'The phone of the member',
    type: String,
    example: '+41 00 000 00 00',
  })
  @IsNotEmpty()
  @Column()
  phone: string;

  @Column()
  isAdmin: boolean;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;
}
