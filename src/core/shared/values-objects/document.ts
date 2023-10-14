export class Document {
  readonly value: string;

  constructor(value: string) {
    const cleanedValue = value.replace(/\D/g, '');

    if (this.isValidCPF(cleanedValue) || this.isValidCNPJ(cleanedValue)) {
      this.value = cleanedValue;
    } else {
      throw new Error('Documento inválido');
    }
  }

  private isValidCPF(cleanedCPF: string): boolean {
    if (cleanedCPF.length !== 11) {
      return false;
    }

    return true;
  }

  private isValidCNPJ(cleanedCNPJ: string): boolean {
    if (cleanedCNPJ.length !== 14) {
      return false;
    }
    return true;
  }
}
