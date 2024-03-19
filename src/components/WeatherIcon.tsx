import { cn } from '@/utils/cn';
import Image from 'next/image';
import React, { memo } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  iconName: string;
}

export default memo(function WeatherIcon({
  iconName,
  className,
  ...props
}: Props) {
  return (
    <div {...props} className={cn('relative h-20 w-20', className)}>
      <Image
        width={100}
        height={100}
        alt="weather-icon"
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
      />
    </div>
  );
});
