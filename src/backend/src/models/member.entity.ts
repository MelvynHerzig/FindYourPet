import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Advert } from './advert.entity';

/**
 * Entity to represents a user of FindYourPet
 */
@Entity()
export class Member {
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

  @Column({ type: 'date' })
  lastModified: Date;

  @Column()
  petAge: number;

  @OneToMany(() => Advert, (advert) => advert.member)
  adverts: Advert[];
}
