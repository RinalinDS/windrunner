export const metersToKilometers = (meters: number): string => {
  const kilometers = meters / 1000;
  return kilometers.toFixed(0) + 'km';
};
