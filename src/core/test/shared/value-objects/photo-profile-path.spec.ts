import { PhotoProfilePath } from '@core/shared/values-objects';
import { PhotoProfilePathDataBuilder } from '../data-builders';

describe('Photo Profile Path [value object]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if URL is empty', () => {
    const value = PhotoProfilePathDataBuilder.aPhotoProfile()
      .withEmptyUrl()
      .build();

    expect(() => new PhotoProfilePath(value)).toThrow('A URL deve ser válida.');
  });

  it('should throw an error if URL is invalid', () => {
    const value = PhotoProfilePathDataBuilder.aPhotoProfile()
      .withInvalidUrl()
      .build();

    expect(() => new PhotoProfilePath(value)).toThrow('A URL deve ser válida.');
  });

  it('should return an create a valid URL', () => {
    const value = PhotoProfilePathDataBuilder.aPhotoProfile().build();
    const url = new PhotoProfilePath(value);

    expect(url).toBeInstanceOf(PhotoProfilePath);
    expect(url.value).toBe(value);
  });
});
