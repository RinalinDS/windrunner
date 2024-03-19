export const convertWindSpeed = (mps: number): string => {
  const kph = mps * 3.6;
  return kph.toFixed(0) + 'km/h';
};
