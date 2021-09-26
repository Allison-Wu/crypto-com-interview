import _ from 'lodash';

export const isArrayIncludeEmpty = (array: any[]) => {
  let isIncludeEmpty = false;
  _.forEach(array, item => {
    const r = _.isEmpty(item);
    if (!r) return;
    isIncludeEmpty = r;
    return false;
  });
  return isIncludeEmpty;
};

export const generateArray = (size: number): string[] => Array(size).fill('');