import React, { ChangeEvent, useState } from 'react'
import { MdWbSunny, MdMyLocation, MdOutlineLocationOn } from "react-icons/md";
import SearchBox from './SearchBox';

type Props = {
  searchValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: ()=> void
  currentCity: string
}

export default function NavBar({onChange, searchValue, currentCity, onSubmit}: Props) {
  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
        <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
            <div className='flex items-center justify-center gap-2'>
                <h2 className='text-gray-500 text-3xl'>Weather</h2>
                <MdWbSunny className='text-3xl mt-1 text-yellow-300' />
            </div>
            <section className='flex gap-2 items-center'>
            <MdMyLocation className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer' />
            <MdOutlineLocationOn className='text-3xl' />
            <p className='text-slate-900/80 text-sm'>{currentCity}</p>
            <div>
                <SearchBox searchValue={searchValue} onChange={onChange} onSubmit={onSubmit} />
            </div>
            </section>
        </div>
    </nav>
  )
}