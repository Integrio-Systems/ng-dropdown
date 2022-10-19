import {GroupedItemsHolder} from './GroupedItemsHolder';

describe('GroupedItemsHolder', () => {

  const items = Array(7).fill(0).map((_, i) => ({value: i + 1, group: (i + 1) % 2 === 0 ? 'even' : 'odd'}));

  const multiGroup = [
    {
      value: 'Node.js',
      tags: ['Web', 'Server']
    },
    {
      value: 'Angular',
      tags: ['Web', 'Client']
    },
    {
      value: 'React',
      tags: ['Web', 'Client']
    },
    {
      value: 'Asp.net',
      tags: ['Web', 'Server']
    },
    {
      value: 'ObjectiveC',
      tags: ['Desktop']
    }
  ];

  it('should group by string', () => {
    const grouped = new GroupedItemsHolder(items, 'group');
    expect(grouped.items).toEqual(jasmine.arrayContaining([
      jasmine.objectContaining({
        name: 'even',
        level: 1
      }),
      items[1],
      items[3],
      items[5],
      jasmine.objectContaining({
        name: 'odd',
        level: 1
      }),
      items[0],
      items[2],
      items[4],
      items[6]
    ]));
  });

  it('should group by array', () => {
    const grouped = new GroupedItemsHolder(multiGroup, 'tags');
    expect(grouped.items).toEqual(jasmine.arrayContaining([
      jasmine.objectContaining({
        name: 'Web',
        level: 1
      }),
      jasmine.objectContaining({
        name: 'Server',
        level: 2
      }),
      multiGroup[0],
      multiGroup[3],
      jasmine.objectContaining({
        name: 'Client',
        level: 2
      }),
      multiGroup[1],
      multiGroup[2],
      jasmine.objectContaining({
        name: 'Desktop',
        level: 1
      }),
      multiGroup[4]
    ]));
  });

});
