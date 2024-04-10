export const timestampToDateString = (timestamp: number): string => {
  if (isNaN(timestamp)) {
    return '';
  }
  const date = new Date(timestamp * 1000);
  return date.toISOString().split('T')[0];
};
