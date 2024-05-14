import React, {useState} from 'react'
import logo from '../../public/assets/icons/logo.svg'
import Image from 'next/image'
import useDebounce from '@/hooks/useDebounce'
import searchIcon from '../../public/assets/icons/search-icon.svg'
import fonts from '../../styles/Fonts.module.css'
import Link from 'next/link'

export default function MovieSearch() {

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
    } // end of handleChange

    const loadDataDebounced = useDebounce(handleChange, 1000)

  return (
    
    <section className='flex lg:flex-row flex-col lg:justify-center'>
    <Image className="pt-6 lg:py-12 px-12 self-center" src={logo} alt="logo" width={250} height={250} />

    <div className="flex flex-col items-center gap-2 overflow-hidden">
      <div className='flex flex-col items-center gap-3'>
        <div className='relative mt-8 flex gap-5'>
          <Image className={`pt-[16px] lg:pt-[10px] absolute top-[7%] left-[4%] lg:left-[2%]`} src={searchIcon} alt="search" width={25} height={25} />
          <input placeholder='Search for movies OR TV Series' type='text' onChange={(e) => loadDataDebounced(e)} className={`rounded-t-xl ${fonts.latoBold} pl-12 lg:pl-16 h-[7vh] w-[90vw] lg:w-[60vw] bg-[#F6F6F6] mb-3`} />
        </div>

        {movies && movies.length > 0 &&
          <div className='mx-auto w-[90%] lg:w-[60vw]'>
            {movies.map((movie, index) => (
              index < 5 &&
              <div key={index} className='mt-2 flex flex-col gap-2'>
                <div className='flex gap-5'>
                  <Link href={`/components/${movie.title}/${movie.id}`}>
                    <Image className='mx-2' src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} width={75} height={75} alt="" />
                  </Link>
                  <div className='flex flex-col gap-2'>
                    <p className='-mt-1 lg:mt-2 text-white text-[14px] lg:text-xl'> {movie.title} </p>
                    <p className='text-[#757575] -mt-2'> {movie.release_date.toString().substring(0, 4)} </p>
                    <p className='text-white text-[15px] lg:text-[18px]'>
                      {movie.cast}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  </section>


  )
}