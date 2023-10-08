export class PhotoProfilePath {
  readonly value: string;

  constructor(value: string) {
    if (!this.isValidURL(value)) {
      throw new Error('A URL deve ser válida.');
    }

    this.value = value;
  }

  private isValidURL(url: string): boolean {
    const urlPattern = /^https?:\/\/\w+(\.\w+)+([/?#]\S*)?$/i;
    return urlPattern.test(url);
  }
}
