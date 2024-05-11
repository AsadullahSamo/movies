import React, { useEffect, useRef, useState } from 'react'
import logo from '../../public/assets/icons/logo.svg'
import Image from 'next/image'
import useDebounce from '@/hooks/useDebounce'
import searchIcon from '../../public/assets/icons/search-icon.svg'
import animation from '../../styles/Animation.module.css'
import fonts from '../../styles/Fonts.module.css'

export default function FindMovies() {

  const inputRef = useRef()
  const [movies, setMovies] = useState([])

  const handleChange = async (e) => {
    const movieName = e.target.value;
    if (movieName === '') {
      setMovies(null);
      return;
    }
  
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${movieName}&language=en-US&page=1`);
      const data = await response.json();
      const movieResults = data.results.slice(0, 5); // Limiting to first 5 results
  
      const castPromises = movieResults.map(async (movie) => {
        const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
        const creditsData = await creditsResponse.json();
        return creditsData.cast.slice(0, 3); // Limiting to first 3 cast members
      });
  
      const castResults = await Promise.all(castPromises);
      
      const updatedMovies = movieResults.map((movie, index) => ({
        ...movie,
        cast: castResults[index].map(actor => actor.name).join(', ')
      }));
  
      setMovies(updatedMovies);
      console.log(updatedMovies)
    } catch (error) {
      console.error("Error fetching data:", error);
      setMovies([]);
    }
  };
  
  const loadDataDebounced = useDebounce(handleChange, 1000)

  return (
    <div className='bg-black min-h-screen'>
      <Image className="py-12 pl-12" src={logo} alt="logo" width={200} height={200} />

      <div className="flex flex-col items-center gap-2 -mt-[5.5rem]">
        <div className='flex items-start gap-12'>
          <Image className={`absolute top-[7%] mx-2`} src={searchIcon} alt="search" width={25} height={25} />
          <input ref={inputRef} type='text' onChange={(e) => loadDataDebounced(e)} className={`rounded-t-xl ${fonts.latoBold} pl-10 h-[7vh] w-[60vw] bg-[#F6F6F6] mb-3`} />
        </div>

          {movies &&
            <div className='h-[83vh] w-[60.4%] mt-[-18px] bg-[#212121]'>
                {movies.map((movie, index) => (
                  index < 5 &&
                    <div className='mt-2 flex flex-col gap-2'>
                      <div className='flex gap-5'>
                        <img className='mx-2' src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} width={75} height={75} alt="" />
                        <div className='flex flex-col gap-2'>
                          <p className='mt-2 text-white text-xl'> {movie.title} </p>
                          <p className='text-[#757575] -mt-2'> {movie.release_date.toString().substring(0, 4)} </p>
                          <p className='text-white text-[18px]'> 
                            {movie.cast}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                }
            </div> 
          }
      </div>
    </div>
  )
}
