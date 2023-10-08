import { Id } from '@core/shared/values-objects';

export abstract class BaseEntity {
  readonly id: Id;

  constructor(id: string) {
    this.id = new Id(id);
  }

  isEqual(entity: BaseEntity): boolean {
    return this.id.value === entity.id.value;
  }
}
