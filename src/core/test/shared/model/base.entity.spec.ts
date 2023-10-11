import { BaseEntity } from '@core/shared/model';

class ConcreteEntity extends BaseEntity {
  constructor(id: string) {
    super(id);
  }
}

describe('BaseEntity [model]', () => {
  it('should check if two entities are equal', () => {
    const id1 = 'b8c3eec4-0b7f-4814-aabd-0e800ef14711';
    const id2 = 'b8c3eec4-0b7f-4814-aabd-0e800ef14711';
    const entity1 = new ConcreteEntity(id1);
    const entity2 = new ConcreteEntity(id2);

    expect(entity1.isEqual(entity2)).toBe(true);
  });

  it('should check if two entities are not equals', () => {
    const id1 = 'b8c3eec4-0b7f-4814-aabd-0e800ef14711';
    const id2 = 'b7c3eec4-0b7f-4814-aabd-0e800ef15589';
    const entity1 = new ConcreteEntity(id1);
    const entity2 = new ConcreteEntity(id2);

    expect(entity1.isEqual(entity2)).toBe(false);
  });
});
