const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export function getHumanReadableDate(dateStr: string): string {
  const [dayStr, monthStr, year] = dateStr.split("-");
  return `${parseInt(dayStr)} ${months[parseInt(monthStr) - 1]}, ${year}`;
}
