import React from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon } from 'lucide-react'
import { ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({dateTime,id}) => {

    const navigate= useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const onBookHandler = () => {
        if (!selectedDate) {
            return toast.error("Please select a date to proceed with booking.");
        } 
        navigate(`/movies/${id}/${selectedDate}`);
        scrollTo(0,0);
        
    };

  return (
    <div id="dateselect" className='pt-30'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-10 
        relative p-8 bg-primary/5 border border-primary/20 rounded-lg'>
            <BlurCircle top='-100px' left='-100px' />
            <BlurCircle top='-100px' right='0px' />
            <div>
                <p className='text-lg font-semibold'>Choose Date</p>
                <div className='flex items-center gap-6 mt-5 text-sm'>
                    <ChevronLeftIcon width={28} />
                    <span className='grid grid-cols-3 md:flex flex-wrap md-max-w-lg gap-4'>
                        {Object.keys(dateTime).map((date) => (
                            <button onClick={() => setSelectedDate(date)} key={date} 
                            className={`flex flex-col items-center justify-center 
                            h-14 w-14 aspect-square rounded cursor-pointer
                            ${selectedDate === date ? 'bg-primary text-white shadow-[0_0_18px_rgba(227,75,60,0.35)]' : 'border border-primary/25 hover:border-primary/70 hover:bg-primary/10'}`}>
                                <span className='text-lg font-semibold'>{new Date(date).getDate()}</span>
                                <span className='text-lg font-semibold'>
                                    {new Date(date).toLocaleDateString("en-IN",{month:"short"})}</span>
                            </button>
                        ))}
                    </span>
                    <ChevronRightIcon width={28} />
                </div>
            </div>
            <button onClick={onBookHandler} className='bg-gradient-to-r from-primary to-primary-dull
                hover:from-primary-dull hover:to-primary-hover text-white py-2 px-8 rounded
              transition-all cursor-pointer font-semibold'>
                Book Now
            </button>

        </div>
      
    </div>
  )
}
export default DateSelect
