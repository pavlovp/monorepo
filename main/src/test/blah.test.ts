import StackSet from '../src/models/StackSet';

describe('test1', () => {
  it('works', () => {
    const s1 = new StackSet<number>();
    s1.push(1);
    s1.push(2);
    s1.push(3);

    const top = s1.pop();
    console.log(top);

    expect(top).toEqual(3);
  });
});
