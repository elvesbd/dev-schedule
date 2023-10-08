import { Coordinates } from '@core/shared/types';

export type Address = {
  street: string;
  number: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type EditAddress = {
  street: string;
  number: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates: Coordinates;
};
