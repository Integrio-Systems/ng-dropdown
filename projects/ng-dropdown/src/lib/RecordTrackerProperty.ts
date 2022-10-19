type SimpleType = string | number;

export type PropertySelector = (record: any) => SimpleType;

export type RecordTrackerProperty = SimpleType | PropertySelector;

export const createPropertySelector = (selector: RecordTrackerProperty): PropertySelector => {
  if (selector) {
    if (typeof selector === 'function') {
      return selector;
    } else {
      return record => record[selector];
    }
  }
  return null;
};
