import { Document } from '@core/shared/values-objects';
import { DocumentDataBuilder } from '../data-builders/document-data-builder';

describe('Document [value object]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if CPF value is not a valid', () => {
    const value = DocumentDataBuilder.aDocument().withInvalidCpf().build();
    expect(() => new Document(value)).toThrow('Documento inválido');
  });

  it('should throw an error if CNPJ value is not a valid', () => {
    const value = DocumentDataBuilder.aDocument().withInvalidCnpj().build();
    expect(() => new Document(value)).toThrow('Documento inválido');
  });

  it('should be create an CPF document instance with success', () => {
    const value = DocumentDataBuilder.aDocument().withCpf().build();
    const cpf = new Document(value);

    expect(cpf).toBeInstanceOf(Document);
    expect(cpf.value).toBe('99999999900');
  });

  it('should be create an CNPJ document instance with success', () => {
    const value = DocumentDataBuilder.aDocument().withCnpj().build();
    const cnpj = new Document(value);

    expect(cnpj).toBeInstanceOf(Document);
    expect(cnpj.value).toBe('12345678000100');
  });
});
