export class PhotoProfilePathDataBuilder {
  private value: string = 'https://supabase.com/image.jpg';

  public static aPhotoProfile(): PhotoProfilePathDataBuilder {
    return new PhotoProfilePathDataBuilder();
  }

  withEmptyUrl(): this {
    this.value = '';
    return this;
  }

  withInvalidUrl(): this {
    this.value = 'invalid_url';
    return this;
  }

  public build(): string {
    return this.value;
  }
}
