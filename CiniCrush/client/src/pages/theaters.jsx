import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Clock3, MapPin, Star } from 'lucide-react'
import { dummyShowsData, theatersData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import toast from 'react-hot-toast'

const getToday = () => {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${today.getFullYear()}-${month}-${day}`
}

const Theaters = () => {
  const [searchParams] = useSearchParams()
  const requestedMovieId = searchParams.get('movie')
  const requestedDate = searchParams.get('date')
  const initialMovieId = dummyShowsData.some((movie) => movie._id === requestedMovieId)
    ? requestedMovieId
    : dummyShowsData[0]?._id ?? ''
  const selectedDate = requestedDate || getToday()
  const [selectedMovieId, setSelectedMovieId] = useState(initialMovieId)
  const navigate = useNavigate()

  const bookShow = (theater, screen, time) => {
    if (!selectedMovieId) {
      toast.error('Please select a movie before choosing a showtime.')
      return
    }

    const showDetails = new URLSearchParams({
      time,
      theater: theater.name,
      screen: `${screen.screenName} · ${screen.screenType}`,
      price: String(screen.ticketPrice),
    })

    navigate(`/movies/${selectedMovieId}/${selectedDate}?${showDetails.toString()}`)
    scrollTo(0, 0)
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-6 pb-24 pt-32 md:px-16 md:pt-40 lg:px-36">
      <BlurCircle top="-120px" left="-120px" />
      <BlurCircle top="520px" right="-180px" />

      <section className="relative mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Find your screen
        </p>
        <h1 className="text-4xl font-bold md:text-5xl">Theaters near you</h1>
        <p className="mt-3 max-w-2xl text-gray-400">
          Explore Bengaluru theaters, compare screens, and choose a showtime to select your seats.
        </p>

        <div className="mt-8 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Choose a movie</h2>
            <p className="mt-1 text-sm text-gray-400">Pick the movie you want to watch.</p>
          </div>
          <select
            aria-label="Choose a movie"
            value={selectedMovieId}
            onChange={(event) => setSelectedMovieId(event.target.value)}
            className="w-full rounded-lg border border-white/15 bg-[#171717] px-4 py-3 text-white outline-none focus:border-primary sm:max-w-sm"
          >
            {dummyShowsData.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 space-y-6">
          {theatersData.theaters.map((theater) => (
            <article
              key={theater.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]/90"
            >
              <div className="grid md:grid-cols-[260px_1fr]">
                <img
                  src={theater.image}
                  alt={theater.name}
                  className="h-56 w-full object-cover md:h-full md:min-h-64"
                />
                <div className="p-5 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-semibold">{theater.name}</h2>
                      <p className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="h-4 w-4 text-primary" />
                        {theater.location}, {theater.city}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">{theater.address}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {theater.rating}
                      <span className="ml-1 text-gray-400">· {theater.distance}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {theater.facilities.map((facility) => (
                      <span
                        key={facility}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 space-y-5">
                    {theater.screens.map((screen) => (
                      <section key={screen.screenId} className="border-t border-white/10 pt-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h3 className="font-medium">{screen.screenName}</h3>
                            <p className="mt-1 text-xs text-gray-400">
                              {screen.screenType} · {screen.availableSeats} seats available · ₹{screen.ticketPrice}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">
                            {screen.totalSeats} seats
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {screen.showTimes.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => bookShow(theater, screen, time)}
                              className="flex items-center gap-2 rounded-lg border border-primary/40 px-3 py-2 text-sm transition hover:border-primary hover:bg-primary/15 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <Clock3 className="h-4 w-4 text-primary" />
                              {time}
                            </button>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Theaters
