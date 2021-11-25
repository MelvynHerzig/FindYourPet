import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AdvertEntity } from './advert.entity';

/**
 * Entity to represents a user of FindYourPet
 */
@Entity('member')
export class MemberEntity {
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

  @OneToMany(() => AdvertEntity, (advert) => advert.member)
  adverts: AdvertEntity[];
}
