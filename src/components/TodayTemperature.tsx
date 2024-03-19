import React from 'react';

type Props = {
  temperature?: number;
  feelsLike?: number;
  minTemp?: number;
  maxTemp?: number;
};

export default function TodayTemperature({
  temperature = 0,
  feelsLike = 0,
  maxTemp = 0,
  minTemp = 0,
}: Props) {
  return (
    <div className="flex flex-col px-4 items-center gap-2">
      <span className="text-5xl">{Math.floor(temperature)}°</span>
      <p className="text-xs space-x-1 whitespace-nowrap">
        <span>Feels like {Math.floor(feelsLike)}°</span>
      </p>
      <p className="text-xs space-x-2 whitespace-nowrap">
        <span> {Math.floor(minTemp)}°&darr;</span>
        <span> {Math.floor(maxTemp)}°&uarr;</span>
      </p>
    </div>
  );
}
