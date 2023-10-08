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
    if (cleanedCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanedCPF)) {
      return false;
    }

    const sum = cleanedCPF
      .split('')
      .slice(0, 9)
      .reduce((acc, digit, index) => acc + parseInt(digit) * (10 - index), 0);
    const remainder = (sum * 10) % 11;

    if (
      (remainder === 10 || remainder === 11 ? 0 : remainder) !==
      parseInt(cleanedCPF[9])
    ) {
      return false;
    }

    const sum2 = cleanedCPF
      .split('')
      .slice(0, 10)
      .reduce((acc, digit, index) => acc + parseInt(digit) * (11 - index), 0);
    const remainder2 = (sum2 * 10) % 11;

    if (
      (remainder2 === 10 || remainder2 === 11 ? 0 : remainder2) !==
      parseInt(cleanedCPF[10])
    ) {
      return false;
    }

    return true;
  }

  private isValidCNPJ(cleanedCNPJ: string): boolean {
    if (cleanedCNPJ.length !== 14 || /^(\d)\1{13}$/.test(cleanedCNPJ)) {
      return false;
    }

    const validate = (input: string, weights: number[]): boolean => {
      const sum = input
        .split('')
        .slice(0, weights.length)
        .reduce(
          (acc, digit, index) => acc + parseInt(digit) * weights[index],
          0,
        );
      const remainder = sum % 11;

      return (
        (remainder < 2 && parseInt(input[weights.length]) === 0) ||
        11 - remainder === parseInt(input[weights.length])
      );
    };

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    return validate(cleanedCNPJ, weights1) && validate(cleanedCNPJ, weights2);
  }
}
