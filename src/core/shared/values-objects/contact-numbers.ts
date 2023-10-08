export type ContactNumbersProps = {
  whatsAppNumber: string;
  mobileNumber: string;
  landlinePhone?: string;
};

export class ContactNumbers {
  readonly whatsAppNumber: string;
  readonly mobileNumber: string;
  readonly landlinePhone?: string;

  constructor(props: ContactNumbersProps) {
    if (
      props.whatsAppNumber.length !== 11 ||
      isNaN(Number(props.whatsAppNumber))
    ) {
      throw new Error(
        'O número do WhatsApp deve ter exatamente 11 caracteres e deve conter apenas números.',
      );
    }

    if (props.mobileNumber.length !== 11 || isNaN(Number(props.mobileNumber))) {
      throw new Error(
        'O número do celular deve ter exatamente 11 caracteres e deve conter apenas números.',
      );
    }

    if (
      props.landlinePhone &&
      (props.landlinePhone.length !== 10 || isNaN(Number(props.landlinePhone)))
    ) {
      throw new Error(
        'O número de telefone fixo deve ter exatamente 10 caracteres e deve conter apenas números.',
      );
    }

    this.whatsAppNumber = props.whatsAppNumber;
    this.mobileNumber = props.mobileNumber;
    this.landlinePhone = props.landlinePhone;
  }
}
