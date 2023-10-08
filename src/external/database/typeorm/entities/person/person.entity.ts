import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../../../../../core/person/enum';

@Entity({ name: 'persons' })
export class TypeORMPersonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  profession: string;

  @Column()
  whatsAppNumber: string;

  @Column()
  mobileNumber: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;

  @Column({ type: 'float8' })
  lng?: number;

  @Column({ type: 'float8' })
  lat?: number;

  @Column()
  profilePhotoPath: string;

  @Column()
  employer: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt?: Date;
}
