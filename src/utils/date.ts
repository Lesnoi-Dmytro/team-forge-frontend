export function formatDate(date: Date | string) {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${padNumber(day)}/${padNumber(month)}/${year}`;
}

export function padNumber(value: number) {
  return value.toString().padStart(2, "0");
}
