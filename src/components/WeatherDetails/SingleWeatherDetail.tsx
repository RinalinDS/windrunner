import React, { memo } from 'react';

type Props = {
  info: string;
  icon: React.ReactNode;
  value: string;
};

export default memo(function SingleWeatherDetail({ icon, info, value }: Props) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap">{info}</p>
      <div className="text-3xl">{icon}</div>
      <p>{value}</p>
    </div>
  );
});
