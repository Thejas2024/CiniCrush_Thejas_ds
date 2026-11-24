
import React, { useState, useEffect } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { dateformat } from '../lib/dateformat'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹'

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () => {
    setBookings(dummyBookingData.slice(0, 1))
    setIsLoading(false)
  }

  useEffect(() => {
    getMyBookings()
  }, [])

  if (isLoading) return <Loading />

  return (
    <div className="relative px-6 md:px-16 lg:px-40 pt-28 md:pt-36 min-h-screen overflow-hidden">

      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" right="100px" />

      {/* Page Header */}
      <div className="relative z-10 mb-10">
        <p className="text-primary uppercase tracking-[4px] text-sm font-medium mb-2">
          Your Cinema Experience
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-white">
          My Bookings
        </h1>

        <p className="text-gray-400 mt-2">
          Your tickets, all in one place.
        </p>
      </div>

      {bookings.map((item, index) => {
        const movie = item.show.movie
        const showDate = new Date(item.show.showDateTime)

        // Realistic single-ticket pricing
        const ticketPrice = 220
        const convenienceFee = 30
        const totalAmount = ticketPrice + convenienceFee

        const seat = item.bookedSeats?.[0] || 'F12'

        return (
          <div
            key={index}
            className="relative z-10 max-w-4xl mx-auto mb-8
            rounded-3xl overflow-hidden
            bg-[#17151f] border border-white/10
            shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          >

            {/* Ticket Main Section */}
            <div className="flex flex-col md:flex-row">

              {/* Movie Poster */}
              <div className="relative w-full md:w-64 shrink-0">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full h-72 md:h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t
                  from-[#17151f] via-black/20 to-transparent md:bg-gradient-to-r" />

                <div className="absolute bottom-5 left-5">
                  <span className="bg-primary px-3 py-1 rounded-full
                    text-xs font-semibold text-white">
                    MOVIE TICKET
                  </span>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="flex-1 p-6 md:p-8">

                {/* Booking Status */}
                <div className="flex justify-between items-center mb-5">
                  <span className="text-xs uppercase tracking-widest text-gray-400">
                    Booking Confirmed
                  </span>

                  <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${item.isPaid
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                    {item.isPaid ? '● Paid' : '● Payment Pending'}
                  </span>
                </div>

                {/* Movie Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {movie.title}
                </h2>

                <p className="text-gray-400 text-sm mt-2">
                  {timeFormat(movie.runtime)}
                </p>

                {/* Theater */}
                <div className="mt-6">
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    Cinema
                  </p>
                  <p className="text-white font-medium mt-1">
                    PVR Cinemas · Bengaluru
                  </p>
                  <p className="text-gray-400 text-sm">
                    Screen 3 · Dolby Atmos
                  </p>
                </div>

                {/* Show Details */}
                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-500 text-xs mb-2">
                      DATE
                    </p>
                    <p className="text-white font-medium">
                      {dateformat(item.show.showDateTime)}
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-500 text-xs mb-2">
                      SHOW TIME
                    </p>
                    <p className="text-white font-medium">
                      {showDate.toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-500 text-xs mb-2">
                      SEAT
                    </p>
                    <p className="text-primary font-bold text-lg">
                      {seat}
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-500 text-xs mb-2">
                      TICKET TYPE
                    </p>
                    <p className="text-white font-medium">
                      Premium · 2D
                    </p>
                  </div>

                </div>

                {/* Price Details */}
                <div className="border-t border-dashed border-white/20 mt-6 pt-5">

                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>1 Ticket × {currency}{ticketPrice}</span>
                    <span>{currency}{ticketPrice}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-400 mb-3">
                    <span>Convenience Fee</span>
                    <span>{currency}{convenienceFee}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">
                      Total Amount
                    </span>

                    <span className="text-2xl font-bold text-white">
                      {currency}{totalAmount}
                    </span>
                  </div>

                </div>

                {/* Pay Button */}
                {!item.isPaid && (
                  <button
                    className="w-full mt-5 bg-primary hover:bg-primary-dull
                    text-white font-medium py-3 rounded-xl
                    transition-all duration-300 hover:shadow-lg
                    hover:shadow-primary/20 cursor-pointer"
                  >
                    Pay Now · {currency}{totalAmount}
                  </button>
                )}

              </div>
            </div>

            {/* Ticket Footer */}
            <div className="border-t border-dashed border-white/20
              px-6 py-4 bg-white/[0.02]
              flex flex-col sm:flex-row justify-between gap-2">

              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Booking ID
                </p>
                <p className="text-white text-sm font-mono mt-1">
                  CIN-{String(index + 1).padStart(5, '0')}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Ticket Status
                </p>
                <p className="text-green-400 text-sm font-medium mt-1">
                  Ready for Showtime
                </p>
              </div>

            </div>

          </div>
        )
      })}

      {/* Empty State */}
      {bookings.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-white">
            No bookings found
          </h2>
          <p className="text-gray-400 mt-2">
            Book a movie and your tickets will appear here.
          </p>
        </div>
      )}

    </div>
  )
}

export default MyBookings
