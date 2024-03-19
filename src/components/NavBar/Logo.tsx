import { MdWbSunny } from 'react-icons/md'

export default function Logo() {
  return (
    <div className='flex items-center justify-center gap-2'>
    <h2 className='text-gray-500 text-3xl'>Weather</h2>
    <MdWbSunny className='text-3xl mt-1 text-yellow-300' />
  </div>
  )
}