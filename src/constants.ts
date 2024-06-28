export const dateFormat = (date: string): string => {
  const formatToUtc: Date = new Date(date);
  return [
    formatToUtc.getDate(),
    formatToUtc.getMonth() + 1,
    formatToUtc.getFullYear()].join('/') + ' ' + [
    formatToUtc.getHours(),
    formatToUtc.getMinutes(),
    formatToUtc.getSeconds()].join(':');
};