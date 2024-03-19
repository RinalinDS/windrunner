import { format, parseISO } from 'date-fns';
import React from 'react';

type Props = {
  date?: string;
};

export default function TodayDate({ date }: Props) {
  return (
    <h2 className="flex gap-1 text-2xl items-end">
      <p>{date && format(parseISO(date), 'EEEE')}</p>
      <p className="text-lg">
        {date && `(${format(parseISO(date), 'dd.MM.yyyy')})`}
      </p>
    </h2>
  );
}
