import { CoordinateProps } from '@core/shared/values-objects';

export class CoordinatesDataBuilder {
  private coordinates: CoordinateProps = {
    lng: -28.1737325,
    lat: -10.790115,
  };

  public static aCoordinates(): CoordinatesDataBuilder {
    return new CoordinatesDataBuilder();
  }

  public build(): CoordinateProps {
    return this.coordinates;
  }
}
