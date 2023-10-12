import { BaseEntity } from '@core/shared/model';
import { Id } from '@core/shared/values-objects';

class ConcreteEntity extends BaseEntity {
  constructor(id: Id) {
    super(id.getValue);
  }
}

describe('BaseEntity [model]', () => {
  it('should check if two entities are equal', () => {
    const id1 = new Id('b8c3eec4-0b7f-4814-aabd-0e800ef14711');
    const id2 = new Id('b8c3eec4-0b7f-4814-aabd-0e800ef14711');
    const entity1 = new ConcreteEntity(id1);
    const entity2 = new ConcreteEntity(id2);

    expect(entity1.isEqual(entity2)).toBe(true);
  });

  it('should check if two entities are not equals', () => {
    const id1 = new Id('b8c3eec4-0b7f-4814-aabd-0e800ef14711');
    const id2 = new Id('b7c3eec4-0b7f-4814-aabd-0e800ef15589');
    const entity1 = new ConcreteEntity(id1);
    const entity2 = new ConcreteEntity(id2);

    expect(entity1.isEqual(entity2)).toBe(false);
  });
});
