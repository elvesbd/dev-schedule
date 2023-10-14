import { CoordinateProps } from '@core/shared/values-objects';

export class CoordinatesDataBuilderProps {
  private coordinates: CoordinateProps = {
    lng: -28.1737325,
    lat: -10.790115,
  };

  public static aCoordinates(): CoordinatesDataBuilderProps {
    return new CoordinatesDataBuilderProps();
  }

  public build(): CoordinateProps {
    return this.coordinates;
  }
}
