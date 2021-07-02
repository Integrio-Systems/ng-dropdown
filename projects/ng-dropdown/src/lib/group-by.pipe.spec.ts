import {GroupByPipe} from './group-by.pipe';

describe('GroupByPipe', () => {

  const items = Array(7).fill(0).map((_, i) => ({value: i + 1, group: (i + 1) % 2 === 0 ? 'even' : 'odd'}));

  it('create an instance', () => {
    const pipe = new GroupByPipe();
    expect(pipe).toBeTruthy();
  });

  it('should group when group is set', () => {
    const pipe = new GroupByPipe();
    const r = pipe.transform(items, 'group');
    expect(r).toEqual(jasmine.arrayContaining([
      jasmine.objectContaining({
        key: 'even',
        items: [items[1], items[3], items[5]]
      }),
      jasmine.objectContaining({
        key: 'odd',
        items: [items[0], items[2], items[4], items[6]]
      }),
    ]));
  });

  it('should return original when group is not set', () => {
    const pipe = new GroupByPipe();
    const r = pipe.transform(items);
    expect(r).toBe(items);
  });

});
