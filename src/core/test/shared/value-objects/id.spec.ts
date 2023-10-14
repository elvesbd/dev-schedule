import { Id } from '@core/shared/values-objects';
import { IdDataBuilder } from '../data-builders';

describe('Id [value object]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if ID value is not a valid', () => {
    const value = IdDataBuilder.aId().withInvalidID().build();
    expect(() => new Id(value)).toThrow('Invalid Id');
  });

  it('should be return an valid uuid', () => {
    const value = IdDataBuilder.aId().build();
    const id = new Id(value);

    expect(id).toBeInstanceOf(Id);
    expect(id.getValue).toBe(value);
  });

  it('should be create an valid uuid', () => {
    const id = new Id();

    expect(id).toBeInstanceOf(Id);
    expect(id).toBeDefined();
  });
});
