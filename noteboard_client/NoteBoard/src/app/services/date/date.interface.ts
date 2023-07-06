export const MONTHS: Record<number, Month> = {
  0: { abbr: 'Jan', name: 'January' },
  1: { abbr: 'Feb', name: 'February' },
  2: { abbr: 'Mar', name: 'March' },
  3: { abbr: 'Apr', name: 'April' },
  4: { abbr: 'May', name: 'May' },
  5: { abbr: 'Jun', name: 'June' },
  6: { abbr: 'Jul', name: 'July' },
  7: { abbr: 'Aug', name: 'August' },
  8: { abbr: 'Sep', name: 'September' },
  9: { abbr: 'Oct', name: 'October' },
  10: { abbr: 'Nov', name: 'November' },
  11: { abbr: 'Dec', name: 'December' },
}

export type Month = {
  abbr: string;
  name: string;
}
