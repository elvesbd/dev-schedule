import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'companies' })
export class TypeORMCompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  tradeName: string;

  @Column()
  email: string;

  @Column()
  cnpj: string;

  @Column()
  contactPerson: string;

  @Column()
  whatsAppNumber: string;

  @Column()
  mobileNumber: string;

  @Column()
  landlinePhone: string;

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
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
