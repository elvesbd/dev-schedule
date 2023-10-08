export type CoordinateProps = {
  lng: number;
  lat: number;
};

export class Coordinates {
  readonly lng: number;
  readonly lat: number;

  constructor(props: CoordinateProps) {
    if (typeof props.lng !== 'number' || isNaN(props.lng)) {
      throw new Error('A longitude (lng) deve ser um número válido.');
    }

    if (typeof props.lat !== 'number' || isNaN(props.lat)) {
      throw new Error('A latitude (lat) deve ser um número válido.');
    }

    this.lng = props.lng;
    this.lat = props.lat;
  }
}
