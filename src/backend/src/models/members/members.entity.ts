import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdvertsEntity } from '../adverts/adverts.entity';
import bcrypt from "bcrypt";

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

  @Column()
  password: string;

  @BeforeInsert() async hashPassword() {
    // We should crypt pass here
    this.password = this.password;
  }

  @Column()
  street: string;

  @Column()
  NPA: number;

  @Column()
  city: string;

  @OneToMany(() => AdvertsEntity, (advert) => advert.member)
  adverts: AdvertsEntity[];
}
