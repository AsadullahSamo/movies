import React, { useEffect, useState } from 'react';
import starIcon from '../../public/assets/icons/star-icon.svg';
import Image from 'next/image';
import fonts from '../../styles/Fonts.module.css';
import Link from 'next/link';
import MovieSearch from './MovieSearch';
import Error from './Error';
import Head from 'next/head'
import { TMDB_URL, TMDB_IMAGE_URL, FEATURED_TODAY_MOVIES_URL, FEATURED_TODAY_SERIES_URL, PREMIER_MOVIES_URL, PREMIER_SERIES_URL } from '../URLs';

export default function FindMovies() {
  const [active, setActive] = useState('movies');
  const [featuredLoading, setFeaturedLoading] = useState("loading...");
  const [premierLoading, setPremierLoading] = useState("loading...");
  const [premierActive, setPremierActive] = useState('premierMovies');
  const [featuredToday, setFeaturedToday] = useState([]);
  const [premiersAndAnnouncements, setPremiersAndAnnouncements] = useState([]);

  const fetchContent = (url, setData, setLoading) => {
    setTimeout(async () => {
      try {
        const response = await fetch(`${url}?api_key=${process.env.TMDB_API_KEY}`);
        const data = await response.json();
        setData(data);
        setLoading("loaded");
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading("error");
      }
    }, 1000);
  }; // end of fetchFeaturedContent

  useEffect(() => {
    fetchContent(FEATURED_TODAY_MOVIES_URL, setFeaturedToday, setFeaturedLoading);
    fetchContent(PREMIER_MOVIES_URL, setPremiersAndAnnouncements, setPremierLoading);
  }, []);

  const showFeaturedMovies = () => {
    setActive('movies');
    setFeaturedLoading("loading...");
    fetchContent(FEATURED_TODAY_MOVIES_URL, setFeaturedToday, setFeaturedLoading);
  }; // end of showMovies

  const showFeaturedSeries = () => {
    setActive('series');
    setFeaturedLoading("loading...");
    fetchContent(FEATURED_TODAY_SERIES_URL, setFeaturedToday, setFeaturedLoading);
  }; // end of showSeries

  const showPremierMovies = () => {
    setPremierActive('premierMovies');
    setPremierLoading("loading...");
    fetchContent(PREMIER_MOVIES_URL, setPremiersAndAnnouncements, setPremierLoading);
  };

  const showPremierSeries = () => {
    setPremierActive('premierSeries');
    setPremierLoading("loading...");
    fetchContent(PREMIER_SERIES_URL, setPremiersAndAnnouncements, setPremierLoading);
  };

  return (
    <>
      <Head>
        <title> Find Movies </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Asadullah Samoon" />
        <meta name="description" content="In this page, the premier and featured today movies and TV series are displayed" />
        <meta charSet="utf-8" />
      </Head>
      
      <div className='bg-black min-h-screen overflow-hidden'>
        <MovieSearch />

        {/* Featured today Movies/TV Series */}
        <p className={`text-[#EFD839] self-start mx-12 mt-20 text-3xl`}> Featured Today </p>
        <nav className='mt-5 self-start mx-12 text-xl w-[80%] sm:w-[85%] md:w-[90%] lg:w-[93%] xl:w-[96%]'>
          <ul className='flex gap-5'>
            <li
              className={`hover:cursor-pointer ${
                active === 'movies' ? 'text-white border-b-4 border-white' : 'text-[#7d7d7d]'
              } pb-[2px] px-5`}
              onClick={showFeaturedMovies}>
              Movies
            </li>
            <li
              className={`hover:cursor-pointer ${
                active === 'series' ? 'text-white border-b-4 border-white' : 'text-[#7d7d7d]'
              } pb-[2px] px-5`}
              onClick={showFeaturedSeries}>
              Series
            </li>
          </ul>
          <hr className='mt-[-2px] border-red-500 border-b-2' />
        </nav>

        <div className='mb-10 max-w-[100%] overflow-auto md:overflow-hidden hover:overflow-auto transition-all duration-500 ml-1 mr-1 self-center justify-center lg:justify-start lg:self-start flex h-[260px] lg:h-[450px] gap-5 flex-wrap lg:flex-nowrap'>
          {featuredLoading === "loaded" ? (
            <>
              {featuredToday.results &&
                featuredToday.results.map((movie, index) => (
                  <div key={index} className='mt-2 flex flex-col gap-2 m-3'>
                    {active === 'movies' ? (
                      <Link href={`/components/${movie.title}/${movie.id}`}>
                        <Image
                          style={{ minWidth: '200px', objectFit: 'cover' }}
                          className='rounded-xl self-center mx-1'
                          src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
                          width={200}
                          height={200}
                          alt='Poster image'
                        />
                      </Link>
                    ) : (
                      <Image
                        style={{ minWidth: '200px', objectFit: 'cover' }}
                        className='rounded-xl self-center mx-1'
                        src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
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
          ) : 
          featuredLoading === "error" ? (
            <div className='mx-auto'>
              <Error />
            </div>
          ) : (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className='mt-5 ml-5 animate-pulse rounded-xl h-60 w-[500px] bg-[#585858]'>
                  {' '}
                </div>
              ))}
            </>
          )}
            
        </div>

        {/* Premiers and Announcements */}
        <p className={`text-[#EFD839] self-start mx-12 mt-20 text-3xl`}> Premiers and Announcements </p>
        <nav className='mt-5 self-start mx-12 text-xl w-[80%] sm:w-[85%] md:w-[90%] lg:w-[93%] xl:w-[96%]'>
          <ul className='flex gap-5'>
            <li
              className={`hover:cursor-pointer ${
                premierActive === 'premierMovies' ? 'text-white border-b-4 border-white' : 'text-[#7d7d7d]'
              } pb-[2px] px-5`}
              onClick={showPremierMovies}>
              Movies
            </li>
            <li
              className={`hover:cursor-pointer ${
                premierActive === 'premierSeries' ? 'text-white border-b-4 border-white' : 'text-[#7d7d7d]'
              } pb-[2px] px-5`}
              onClick={showPremierSeries}>
              Series
            </li>
          </ul>
          <hr className='mt-[-2px] border-red-500 border-b-2' />
        </nav>

        <div className={`mb-5 max-w-[100%] overflow-auto md:overflow-hidden hover:overflow-auto transition-all duration-500 ml-1 mr-1 self-center justify-center lg:justify-start lg:self-start flex h-[260px] lg:h-[450px] gap-5 flex-wrap lg:flex-nowrap`}>
          {premierLoading === "loaded" ? (
            <>
              {premiersAndAnnouncements.results &&
                premiersAndAnnouncements.results.map((movie, index) => (
                  <div key={index} className='mt-2 flex flex-col gap-2 m-3 mb-10'>
                    {premierActive === 'premierMovies' ? (
                      <Link href={`/components/${movie.title}/${movie.id}`}>
                        <Image
                          style={{ minWidth: '200px', objectFit: 'cover' }}
                          className='rounded-xl self-center mx-1'
                          src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
                          width={200}
                          height={200}
                          alt='Poster image'
                        />
                      </Link>
                    ) : (
                      <Image
                        style={{ minWidth: '200px', objectFit: 'cover' }}
                        className='rounded-xl self-center mx-1'
                        src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
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
          )  : 
          premierLoading === "error" ? (
            <div className='mx-auto'>
              <Error />
            </div>
          ) : (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className='mt-5 ml-5 animate-pulse rounded-xl h-60 w-[500px] bg-[#585858]'>
                  {' '}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
