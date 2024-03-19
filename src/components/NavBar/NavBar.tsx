'use client';

import { useNavBarData } from '@/hooks/useNavbarData';
import { memo, useEffect, useState } from 'react';
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from 'react-icons/md';
import SearchBox from '../SearchBox';
import SuggestionBox from './SuggestionBox';
import Logo from './Logo';
import { minWindowSizeForSmallScreen } from '@/constants/minSizes';

type Props = {
  location: string | undefined;
  setCurrentCity: (value: string) => void;
};

export default memo(function NavBar({ location, setCurrentCity }: Props) {
  const {
    error,
    handleCurrentLocation,
    handleSubmitSearch,
    handleSuggestionClick,
    onChange,
    searchValue,
    showSuggestions,
    suggestions,
  } = useNavBarData(setCurrentCity);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < minWindowSizeForSmallScreen);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <Logo />
          <section className="flex gap-2 items-center">
            <MdMyLocation
              title="Your current location"
              onClick={handleCurrentLocation}
              className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
            />
            <MdOutlineLocationOn className="text-3xl" />
            <p className="text-slate-900/80 text-sm">{location}</p>
            {!isSmallScreen && (
              <div className="relative hidden md:flex">
                <SearchBox
                  searchValue={searchValue}
                  onChange={onChange}
                  onSubmit={handleSubmitSearch}
                  disabled={!suggestions.length}
                />
                <SuggestionBox
                  {...{
                    error,
                    handleSuggestionClick,
                    showSuggestions,
                    suggestions,
                  }}
                />
              </div>
            )}
          </section>
        </div>
      </nav>
      {isSmallScreen && (
        <section className="flex max-w-7xl px-3 md:hidden">
          <div className="relative">
            <SearchBox
              searchValue={searchValue}
              onChange={onChange}
              onSubmit={handleSubmitSearch}
              disabled={!suggestions.length}
            />
            <SuggestionBox
              {...{
                error,
                handleSuggestionClick,
                showSuggestions,
                suggestions,
              }}
            />
          </div>
        </section>
      )}
    </>
  );
});
