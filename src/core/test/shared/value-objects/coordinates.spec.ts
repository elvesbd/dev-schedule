import { CoordinateProps, Coordinates } from '@core/shared/values-objects';
import { CoordinatesDataBuilder } from '../data-builders';

describe('Coordinates [value object]', () => {
  let props: CoordinateProps;

  beforeEach(() => {
    jest.clearAllMocks();
    props = CoordinatesDataBuilder.aCoordinates().build();
  });

  test('should throw an error if longitude is not a valid number', () => {
    props.lng = 'invalid' as any;

    expect(() => new Coordinates(props)).toThrow(
      'A longitude (lng) deve ser um número válido.',
    );
  });

  test('should throw an error if latitude is not a valid number', () => {
    props.lat = 'invalid' as any;

    expect(() => new Coordinates(props)).toThrow(
      'A latitude (lat) deve ser um número válido.',
    );
  });

  it('should be create an coordinates instance with success', () => {
    const coordinates = new Coordinates(props);

    expect(coordinates).toBeInstanceOf(Coordinates);
    expect(coordinates.lng).toBe(-28.1737325);
    expect(coordinates.lat).toBe(-10.790115);
  });
});
