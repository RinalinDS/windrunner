'use client'

import React, { ChangeEvent, useState } from 'react'
import { MdWbSunny, MdMyLocation, MdOutlineLocationOn } from "react-icons/md";
import SearchBox from './SearchBox';
import axios from 'axios';

type Props = {
  location: string | undefined;
  setCurrentCity: (value: string) => void
}

export default function NavBar({location, setCurrentCity }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const [error, setError] = useState('')

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSuggestionClick = (value: string) => {
    setSearchValue('')
    setError('')
    setCurrentCity(value)
    setShowSuggestions(false)
    setSuggestions([])
  }

  // TODO USE DEBOUNSE SEARCH VALUE
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchValue(value)
    if (value.length >= 3) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)

        const suggestions = response.data.list.map((item: any) => item.name)
        setSuggestions(suggestions)
        setError('')
        setShowSuggestions(true)
      } catch (e) {
        setSuggestions([])
        setShowSuggestions(false)

      }
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  function handleSubmitSearch (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      if(suggestions.length === 0) {
        setError('Location not found')
      } else {
        setError('')
        setCurrentCity(searchValue)
        setShowSuggestions(false)
        setSearchValue('')
      }
  }

  function handleCurrentLocation () {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async(position)=> {
        const {latitude, longitude} = position.coords
        console.log('lat', latitude, longitude)
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
          setCurrentCity(response.data.name)
        } catch(e){

        }
      })
    }

  }

  console.log('suggestion', suggestions);
  

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
            <SuggestionBox {...{error, handleSuggestionClick, showSuggestions, suggestions}} />
          </div>
        </section>
      </div>
    </nav>
    <section className='flex max-w-7xl px-3 md:hidden'>
    <div className='relative'>
            <SearchBox searchValue={searchValue} onChange={onChange} onSubmit={handleSubmitSearch} />
            <SuggestionBox {...{error, handleSuggestionClick, showSuggestions, suggestions}} />
          </div>
    </section>

    </>
  )
}

type SuggestionProps = {
  showSuggestions: boolean
  suggestions: string[]
  error: string
  handleSuggestionClick: (item: string) => void
}

function SuggestionBox({ error, handleSuggestionClick, showSuggestions, suggestions }: SuggestionProps) {
  if (!showSuggestions) {
    return null
  }
  return (
    <>
      {((showSuggestions && suggestions.length >= 1) || error) && (
        <ul className='mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2'>
          {error && suggestions.length < 1 && (<li className='text-red-500 p-1'>{error}</li>) }
          {suggestions.map((item, i) => {
            return (
              <li key={i} className='cursor-pointer p-1 rounded hover:bg-gray-200' onClick={() => handleSuggestionClick(item)}> {item}   </li>
            )
          })}
          
        </ul>)}
    </>
  )
}