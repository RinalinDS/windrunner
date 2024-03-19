import React, { memo } from 'react';

type Props = {
  showSuggestions: boolean;
  suggestions: string[];
  error: string;
  handleSuggestionClick: (item: string) => void;
};

export default memo(function SuggestionBox({
  error,
  handleSuggestionClick,
  showSuggestions,
  suggestions,
}: Props) {
  if (!showSuggestions) {
    return null;
  }
  return (
    <>
      {((showSuggestions && suggestions.length >= 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1">{error}</li>
          )}
          {suggestions.map((item, i) => {
            return (
              <li
                key={`${item}${i}`}
                className="cursor-pointer p-1 rounded hover:bg-gray-200"
                onClick={() => handleSuggestionClick(item)}
              >
                {' '}
                {item}{' '}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
});
