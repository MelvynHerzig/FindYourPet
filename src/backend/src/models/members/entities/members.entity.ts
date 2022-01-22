import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';
import { IsEmail, IsNotEmpty, IsPostalCode } from 'class-validator';

/**
 * Entity to represents a user of FindYourPet
 */
@Entity('member')
export class Member {
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column()
  firstname: string;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsEmail()
  @Column({
    unique: true,
  })
  email: string;

  @IsNotEmpty()
  @Column({
    length: 60,
  })
  password: string;

  @IsNotEmpty()
  @Column()
  street: string;

  @IsPostalCode()
  @Column()
  NPA: number;

  @IsNotEmpty()
  @Column()
  city: string;

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
