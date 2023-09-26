export const months = [
  'January',
  'February',
  'March',
  'April',
  'Mei',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const loopYear = (isLeap: boolean = false) => {
  const startYear = new Date().getFullYear();
  const endYear = 1920;
  const result: string[] = [];
  if (isLeap) {
    for (let i = startYear; i >= endYear; i--) {
      if (i % 4 === 0) {
        result.push(i.toString());
      }
    }
  } else {
    for (let i = startYear; i >= endYear; i--) {
      result.push(i.toString());
    }
  }
  return result;
};

