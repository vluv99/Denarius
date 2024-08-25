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

export function formatToCurrency(value: number): string {
  return new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    minimumFractionDigits: 0,
  }).format(value);
}
