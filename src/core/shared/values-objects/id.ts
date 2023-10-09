import { v4 as uuidv4, validate } from 'uuid';

export class Id {
  constructor(private value: string = uuidv4()) {
    if (!validate(value)) throw new Error('Invalid Id');
  }

  get getValue() {
    return this.value;
  }
}
