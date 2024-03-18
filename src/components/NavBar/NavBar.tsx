'use client'

import { useNavBarData } from '@/hooks/useNavbarData';
import { memo } from 'react';
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from '../SearchBox';
import SuggestionBox from './SuggestionBox';

type Props = {
  location: string | undefined;
  setCurrentCity: (value: string) => void
}

export default memo(function NavBar({ location, setCurrentCity }: Props) {
  const {error, handleCurrentLocation, handleSubmitSearch, handleSuggestionClick, onChange, searchValue, showSuggestions, suggestions} = useNavBarData(setCurrentCity)

// TODO MB DECOPMOSE , MB NOT , NOT SURE  
  return (
    <>
      <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
        <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
          <div className='flex items-center justify-center gap-2'>
            <h2 className='text-gray-500 text-3xl'>Weather</h2>
            <MdWbSunny className='text-3xl mt-1 text-yellow-300' />
          </div>
          <section className='flex gap-2 items-center'>
            <MdMyLocation title='Your current location' onClick={handleCurrentLocation} className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer' />
            <MdOutlineLocationOn className='text-3xl' />
            <p className='text-slate-900/80 text-sm'>{location}</p>
            <div className='relative hidden md:flex'>
              <SearchBox searchValue={searchValue} onChange={onChange} onSubmit={handleSubmitSearch} />
              <SuggestionBox {...{ error, handleSuggestionClick, showSuggestions, suggestions }} />
            </div>
          </section>
        </div>
      </nav>
      <section className='flex max-w-7xl px-3 md:hidden'>
        <div className='relative'>
          <SearchBox searchValue={searchValue} onChange={onChange} onSubmit={handleSubmitSearch} />
          <SuggestionBox {...{ error, handleSuggestionClick, showSuggestions, suggestions }} />
        </div>
      </section>
    </>
  )
})

