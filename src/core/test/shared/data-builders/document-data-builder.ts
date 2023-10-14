export class DocumentDataBuilder {
  private value: string = '';

  public static aDocument(): DocumentDataBuilder {
    return new DocumentDataBuilder();
  }

  withCpf(): this {
    this.value = '999.999.999-00';
    return this;
  }

  withInvalidCpf(): this {
    this.value = '99.999.999-00';
    return this;
  }

  withCnpj(): this {
    this.value = '12.345.678/0001-00';
    return this;
  }

  withInvalidCnpj(): this {
    this.value = '12.345.678/000-00';
    return this;
  }

  public build(): string {
    return this.value;
  }
}
