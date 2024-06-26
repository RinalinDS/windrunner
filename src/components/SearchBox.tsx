import { cn } from '@/utils';
import { ChangeEventHandler, FormEventHandler, memo } from 'react';
import { IoSearch } from 'react-icons/io5';

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  searchValue: string;
  className?: string;
  disabled?: boolean;
};

export default memo(function SearchBox({
  className,
  searchValue,
  onChange,
  onSubmit,
  disabled,
}: Props) {
  return (
    <form
      className={cn(
        'flex relative items-center justify-center h-10',
        className
      )}
      onSubmit={onSubmit}
    >
      <input
        value={searchValue}
        onChange={onChange}
        type="text"
        placeholder="Search location..."
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
      />
      <button
        className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none enabled:hover:bg-blue-600 h-full disabled:opacity-50"
        disabled={disabled}
      >
        <IoSearch />
      </button>
    </form>
  );
});
