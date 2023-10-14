import { CoordinateProps, Coordinates } from '@core/shared/values-objects';
import { CoordinatesDataBuilderProps } from '../data-builders';

describe('Coordinates [value object]', () => {
  let props: CoordinateProps;

  beforeEach(() => {
    jest.clearAllMocks();
    props = CoordinatesDataBuilderProps.aCoordinates().build();
  });

  test('deve lançar um erro se a longitude não for um número válido', () => {
    props.lng = 'invalid' as any;

    expect(() => new Coordinates(props)).toThrow(
      'A longitude (lng) deve ser um número válido.',
    );
  });

  test('deve lançar um erro se a latitude não for um número válido', () => {
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
