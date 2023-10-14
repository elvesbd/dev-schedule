export class IdDataBuilder {
  private value: string = 'b8c3eec4-0b7f-4814-aabd-0e800ef14711';

  public static aId(): IdDataBuilder {
    return new IdDataBuilder();
  }

  withInvalidID(): this {
    this.value = 'invalid_id';
    return this;
  }

  public build(): string {
    return this.value;
  }
}
