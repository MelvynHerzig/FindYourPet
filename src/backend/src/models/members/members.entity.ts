import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AdvertsEntity } from '../adverts/adverts.entity';

/**
 * Entity to represents a user of FindYourPet
 */
@Entity('member')
export class MembersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  street: string;

  @Column()
  NPA: number;

  @Column()
  city: string;

  @OneToMany(() => AdvertsEntity, (advert) => advert.member)
  adverts: AdvertsEntity[];
}
