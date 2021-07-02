import {SelectedRecords, ValueMode} from './SelectedRecords';

describe('SelectedRecords', () => {

  let selected: SelectedRecords;
  const records = Array(10).fill(0).map((_, i) => ({name: `Product ${i + 1}`, id: i}));
  const idComparer = (a: any, b: any) => a.id === b.id;

  beforeEach(() => {
    selected = new SelectedRecords();
    selected.setAllRecords(records);
  });

  it('clear should clear records', () => {
    selected.set(records[3]);
    selected.clear();
    expect(selected.records.length).toBe(0);
  });

  it('change mode should clear records', () => {
    selected.set(records[3]);
    selected.setMode(ValueMode.multi);
    expect(selected.records.length).toBe(0);
  });

  describe('multi', () => {

    it('calling select with already selected record should deselect', () => {
      selected.setMode(ValueMode.multi);
      selected.select(records[2]);
      selected.select(records[2]);
      expect(selected.records.length).toBe(0);
    });

    it('calling select with new record should append', () => {
      selected.setMode(ValueMode.multi);
      selected.select(records[2]);
      selected.select(records[3]);
      expect(selected.records.length).toBe(2);
      expect(selected.records).toEqual(jasmine.arrayContaining([records[2], records[3]]));
    });

    it('set should preselect records', () => {
      const preselectedRecords = [records[2], records[3]];
      selected.setMode(ValueMode.multi);
      selected.set(preselectedRecords);
      expect(selected.records.length).toBe(preselectedRecords.length);
      expect(selected.records).toEqual(jasmine.arrayContaining(preselectedRecords));
    });

    it('clear should clear ngModel', () => {
      selected.setMode(ValueMode.multi);
      selected.set(records[3]);
      selected.clear();
      expect(selected.ngModel.length).toBe(0);
    });

    it('setting comparer when there is initial data', () => {
      selected.setMode(ValueMode.multi);
      selected.set([records[3], records[2]]);
      selected.setRecordComparer(idComparer);
      expect(selected.ngModel).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
          id: 3
        }),
        jasmine.objectContaining({
          id: 2
        })
      ]));
      expect(selected.records).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
          id: 3
        }),
        jasmine.objectContaining({
          id: 2
        })
      ]));
    });

    it('setting value binder when there is initial data', () => {
      selected.setMode(ValueMode.multi);
      selected.set([5, 6]);
      selected.setValueBinder('id');
      expect(selected.ngModel).toEqual(jasmine.arrayContaining([5, 6]));
      expect(selected.records).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
          id: 5
        }),
        jasmine.objectContaining({
          id: 6
        })
      ]));
    });

    it('setting value binder when there is initial data and no records', () => {
      selected.setMode(ValueMode.multi);
      selected.setAllRecords([]);
      selected.set([5, 6]);
      selected.setValueBinder('id');
      expect(selected.ngModel).toEqual(jasmine.arrayContaining([5, 6]));
    });

    it('when there is initial data and comparer , rawRecords should be mixed with ngModelRecords', () => {
      selected.setMode(ValueMode.multi);
      const initial = [{id: 0, name: 'Product 1'}, {id: 6, name: 'Product 7'}];
      selected.set(initial);
      selected.setRecordComparer(idComparer);
      expect(selected.ngModel).toEqual(jasmine.arrayContaining(initial));
      expect(selected.records).toEqual(jasmine.arrayContaining(initial));
    });

  });

  describe('single', () => {

    it('selected record should persist', () => {
      selected.select(records[2]);
      expect(selected.records).toContain(records[2]);
    });

    it('selecting already selected record will replace', () => {
      selected.setMode(ValueMode.single);
      selected.select(records[2]);
      selected.select(records[3]);
      expect(selected.records.length).toBe(1);
      expect(selected.records).toContain(records[3]);
    });

    it('calling set should preselect record', () => {
      selected.set(records[3]);
      expect(selected.records.length).toBe(1);
      expect(selected.records).toEqual(jasmine.arrayContaining([records[3]]));
    });

    it('clear should clear ngModel', () => {
      selected.set(records[3]);
      selected.clear();
      expect(selected.ngModel).toBe(undefined);
    });

    it('setting comparer when there is initial data', () => {
      selected.set(records[3]);
      selected.setRecordComparer(idComparer);
      expect(selected.ngModel).toEqual(jasmine.objectContaining({
        id: 3
      }));
      expect(selected.records).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
          id: 3
        })
      ]));
    });

    it('setting value binder when there is initial data', () => {
      selected.set(3);
      selected.setValueBinder('id');
      expect(selected.ngModel).toEqual(3);
      expect(selected.records).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
          id: 3
        })
      ]));
    });

    it('setting value binder when there is initial data and no records', () => {
      selected.setAllRecords([]);
      selected.set(6);
      selected.setValueBinder('id');
      expect(selected.ngModel).toBe(6);
    });

  });

});

