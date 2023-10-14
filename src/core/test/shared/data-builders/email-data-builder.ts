export class EmailDataBuilder {
  private value: string = 'john@mail.com';

  public static aEmail(): EmailDataBuilder {
    return new EmailDataBuilder();
  }

  withInvalidEmail(): this {
    this.value = 'john@mail,com';
    return this;
  }

  withNotDomain(): this {
    this.value = 'john@';
    return this;
  }

  withNotUser(): this {
    this.value = '@exemplo.com';
    return this;
  }

  withSpaces(): this {
    this.value = 'john @exemplo.com';
    return this;
  }

  withPointIncorrectly(): this {
    this.value = 'john@exemplo_com';
    return this;
  }

  withNotPointInDomain(): this {
    this.value = 'john@exemplo';
    return this;
  }

  withMultipleAt(): this {
    this.value = 'john@exemplo@com';
    return this;
  }

  public build(): string {
    return this.value;
  }
}
