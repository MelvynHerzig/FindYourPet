import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adverts } from '../../adverts/entities/adverts.entity';
import { Point } from 'geojson';
import { Exclude } from 'class-transformer';

// Doesn't work with import style..
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

/**
 * Entity to represents a user of FindYourPet
 */
@Entity('member')
export class Members {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column({
    length: 60,
  })
  password: string;

  @BeforeInsert()
  hashPassword() {
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

  @OneToMany(() => Adverts, (advert) => advert.member)
  adverts: Adverts[];

  constructor(partial: Partial<Members>) {
    Object.assign(this, partial);
  }
}
