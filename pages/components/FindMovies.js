import React, { useEffect, useState } from 'react';
import starIcon from '../../public/assets/icons/star-icon.svg';
import Image from 'next/image';
import fonts from '../../styles/Fonts.module.css';
import Link from 'next/link';
import MovieSearch from './MovieSearch';

export default function FindMovies() {
  const [active, setActive] = useState('movies');
  const [loading, setLoading] = useState(true);
  const [premierActive, setPremierActive] = useState('premierMovies');
  const [featuredToday, setFeaturedToday] = useState([]);
  const [premiersAndAnnouncements, setPremiersAndAnnouncements] = useState([]);

  const fetchFeaturedContent = (url) => {
    fetch(`${url}?api_key=${process.env.TMDB_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setFeaturedToday(data);
        setLoading(false);
      });
  }; // end of fetchFeaturedContent

  const fetchPremiersAndAnnouncements = (url) => {
    fetch(`${url}?api_key=${process.env.TMDB_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setPremiersAndAnnouncements(data);
        setLoading(false);
      });
  }; // end of fetchPremiersAndAnnouncements

  useEffect(() => {
    fetchFeaturedContent('https://api.themoviedb.org/3/trending/movie/day');
    fetchPremiersAndAnnouncements('https://api.themoviedb.org/3/movie/upcoming');
  }, []);

  const showMovies = () => {
    setActive('movies');
    fetchFeaturedContent('https://api.themoviedb.org/3/trending/movie/day');
  }; // end of showMovies

  const showSeries = () => {
    setActive('series');
    fetchFeaturedContent('https://api.themoviedb.org/3/tv/airing_today');
  }; // end of showSeries

  const showPremierMovies = () => {
    setPremierActive('premierMovies');
    fetchPremiersAndAnnouncements('https://api.themoviedb.org/3/movie/upcoming');
  };

  const showPremierSeries = () => {
    setPremierActive('premierSeries');
    fetchPremiersAndAnnouncements('https://api.themoviedb.org/3/tv/on_the_air');
  };

  return (
    <div className='bg-black min-h-screen'>
      <MovieSearch />

      {/* Featured today Movies/TV Series */}
      <p className={`text-[#EFD839] self-start mx-12 mt-20 text-3xl`}> Featured Today </p>
      <nav className='mt-5 self-start mx-12 text-xl w-[96%]'>
        <ul className='flex gap-5'>
          <li
            className={`hover:cursor-pointer ${
              active === 'movies' ? 'text-white border-b-4 border-white' : 'text-[#7d7d7d]'
            } pb-[2px] px-5`}
            onClick={showMovies}>
            {' '}
            Movies{' '}
          </li>
          <li
            className={`hover:cursor-pointer ${
              active === 'series' ? 'text-white border-b-4 border-white' : 'text-[#7d7d7d]'
            } pb-[2px] px-5`}
            onClick={showSeries}>
            {' '}
            Series{' '}
          </li>
        </ul>
        <hr className='mt-[-2px] border-red-500 border-b-2' />
      </nav>

      <div className='mb-10 max-w-[100%] overflow-auto ml-1 mr-1 self-start flex h-[450px] gap-5'>
        {!loading ? (
          <>
            {featuredToday.results &&
              featuredToday.results.map((movie, index) => (
                <div key={index} className='mt-2 flex flex-col gap-2 m-3'>
                  {active === 'movies' ? (
                    <Link href={`/components/${movie.title}/${movie.id}`}>
                      <Image
                        style={{ minWidth: '200px', objectFit: 'cover' }}
                        className='rounded-xl self-center mx-1'
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        width={200}
                        height={200}
                        alt='Poster image'
                      />
                    </Link>
                  ) : (
                    <Image
                      style={{ minWidth: '200px', objectFit: 'cover' }}
                      className='rounded-xl self-center mx-1'
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      width={200}
                      height={200}
                      alt='Poster image'
                    />
                  )}
                  <div className='flex gap-2 -mt-11 ml-1 w-16 h-9 bg-black justify-start'>
                    <Image className='ml-1 self-center' src={starIcon} width={20} height={20} alt='star icon' />
                    <p className={`${fonts.latoBold} text-white self-center`}> {Number(movie.vote_average).toFixed(1)} </p>
                  </div>
                  <p className='w-[80%] self-center text-center mt-2 text-[#c0c0c0]'>
                    {' '}
                    {active === 'movies' ? movie.title : movie.name}{' '}
                  </p>
                </div>
              ))}
          </>
        ) : (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className='ml-5 animate-pulse rounded-xl h-60 w-[500px] bg-[#585858]'>
                {' '}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Premiers and Announcements */}
      <p className={`text-[#EFD839] self-start mx-12 mt-20 text-3xl`}> Premiers and Announcements </p>
      <nav className='mt-5 self-start mx-12 text-xl w-[96%]'>
        <ul className='flex gap-5'>
          <li
            className={`hover:cursor-pointer ${
              premierActive === 'premierMovies' ? 'text-white border-b-4 border-white' : 'text-[#7d7d7d]'
            } pb-[2px] px-5`}
            onClick={showPremierMovies}>
            {' '}
            Movies{' '}
          </li>
          <li
            className={`hover:cursor-pointer ${
              premierActive === 'premierSeries' ? 'text-white border-b-4 border-white' : 'text-[#7d7d7d]'
            } pb-[2px] px-5`}
            onClick={showPremierSeries}>
            {' '}
            Series{' '}
          </li>
        </ul>
        <hr className='mt-[-2px] border-red-500 border-b-2' />
      </nav>

      <div className='max-w-[100%] overflow-auto ml-1 mr-1 self-start flex h-[450px] gap-5'>
        {!loading ? (
          <>
            {premiersAndAnnouncements.results &&
              premiersAndAnnouncements.results.map((movie, index) => (
                <div key={index} className='mt-2 flex flex-col gap-2 m-3'>
                  {premierActive === 'premierMovies' ? (
                    <Link href={`/components/${movie.title}/${movie.id}`}>
                      <Image
                        style={{ minWidth: '200px', objectFit: 'cover' }}
                        className='rounded-xl self-center mx-1'
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        width={200}
                        height={200}
                        alt='Poster image'
                      />
                    </Link>
                  ) : (
                    <Image
                      style={{ minWidth: '200px', objectFit: 'cover' }}
                      className='rounded-xl self-center mx-1'
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      width={200}
                      height={200}
                      alt='Poster image'
                    />
                  )}
                  <div className='flex gap-2 -mt-11 ml-1 w-16 h-9 bg-black justify-start'>
                    <Image className='ml-1 self-center' src={starIcon} width={20} height={20} alt='star icon' />
                    <p className={`${fonts.latoBold} text-white self-center`}> {Number(movie.vote_average).toFixed(1)} </p>
                  </div>
                  <p className='w-[80%] self-center text-center mt-2 text-[#c0c0c0]'>
                    {' '}
                    {premierActive === 'premierMovies' ? movie.title : movie.name}{' '}
                  </p>
                </div>
              ))}
          </>
        ) : (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className='ml-5 animate-pulse rounded-xl h-60 w-[500px] bg-[#585858]'>
                {' '}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
