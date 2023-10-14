export class NameDataBuilder {
  private value: string = 'John Doe';

  public static aName(): NameDataBuilder {
    return new NameDataBuilder();
  }

  withEmptyName(): this {
    this.value = '';
    return this;
  }

  nameWithNumbers(): this {
    this.value = '2John Doe';
    return this;
  }

  nameWithCharacters(): this {
    this.value = '@John Doe';
    return this;
  }

  public build(): string {
    return this.value;
  }
}
