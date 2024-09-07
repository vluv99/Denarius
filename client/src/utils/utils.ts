export function isDateToday(date: Date): boolean {
  const d_day = date.getDate(),
    d_month = date.getMonth() + 1,
    d_year = date.getFullYear(),
    today = new Date(),
    today_day = today.getDate(),
    today_month = today.getMonth() + 1,
    today_year = today.getFullYear();

  return (
    d_year === today_year && d_month === today_month && d_day === today_day
  );
}

export function isDateIn30Days(date: Date): boolean {
  const compareDate = new Date(new Date().setDate(new Date().getDate() - 30));

  return compareDate.getTime() <= date.getTime();
}

export function isDateFromLastMonth(date: Date) {
  const today = new Date(),
    thisMonth = today.getMonth() + 1,
    datesMonth = date.getMonth() + 1;

  return thisMonth === 1 ? datesMonth === 12 : datesMonth === thisMonth - 1;
}

export function formatToCurrency(value: number): string {
  return new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    minimumFractionDigits: 0,
  }).format(value);
}
