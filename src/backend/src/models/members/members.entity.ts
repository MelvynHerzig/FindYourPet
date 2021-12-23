import {
  BeforeInsert,
  Column,
  Entity, Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdvertsEntity } from '../adverts/adverts.entity';
import { Point } from 'geojson';

const bcrypt = require('bcryptjs');

/**
 * Entity to represents a user of FindYourPet
 */
@Entity('member')
export class MembersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    length: 60,
  })
  password: string;

  @BeforeInsert() hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @Column()
  street: string;

  @Column()
  NPA: number;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @OneToMany(() => AdvertsEntity, (advert) => advert.member)
  adverts: AdvertsEntity[];
}
