import React, { useState, useEffect } from 'react'
import MovieSearch from './MovieSearch'
import fonts from '../../styles/Fonts.module.css'
import starIcon from '../../public/assets/icons/star-icon.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Error from './Error'
import { TMDB_URL, OMDB_URL, TMDB_IMAGE_URL } from '../URLs'

export default function Details() {

	const router = useRouter()
	const [tmdbData, setTmdbData] = useState([])
	const [omdbData, setOmdbData] = useState([])
	const [actors, setActors] = useState('')
	const [month, setMonth] = useState('')
	const [loading, setLoading]	= useState("loading...")
	const [cast, setCast] = useState([{name: '', character: '', profile_path: ''}])

	useEffect(() => {
		if (router.isReady) {
			setTimeout(() => {
				fetch(`${TMDB_URL}/${router.query?.details[1]}?api_key=${process.env.TMDB_API_KEY}`)
				.then((response) => response.json())
				.then((data) => {
					setTmdbData(data)
					setLoading("loaded")
					setMonth(data.release_date.substring(5, 7))
					if (month === '01') setMonth('January')
					else if (month === '02') setMonth('February')
					else if (month === '03') setMonth('March')
					else if (month === '04') setMonth('April')
					else if (month === '05') setMonth('May')
					else if (month === '06') setMonth('June')
					else if (month === '07') setMonth('July')
					else if (month === '08') setMonth('August')
					else if (month === '09') setMonth('September')
					else if (month === '10') setMonth('October')
					else if (month === '11') setMonth('November')
					else setMonth('December')
				})
				.catch((error) => {
					console.error("Error fetching data:", error)
					setLoading("error")
				})
			}, 1000)
		
			setTimeout(() => {
				fetch(`${OMDB_URL}?t=${router.query?.details[0]}&apikey=${process.env.OMDB_API_KEY}`)
				.then((response) => response.json())
				.then((data) => {
					setOmdbData(data)
					setLoading("loaded")
				})
				.catch((error) => {
					console.error("Error fetching data:", error)
					setLoading("error")
				})
			}, 1000)

			setTimeout(() => {
				fetch(`${TMDB_URL}/${router.query.details[1]}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`)
				.then((response) => response.json())
				.then((data, index) => {
					setActors(data.cast.slice(0, 3).map(actor => actor.name).join(', '))
					setCast(
						data.cast.filter(actor => actor.known_for_department === "Acting")
						.map(actor => (
							{ name: actor.name, character: actor.character, profile_path: actor.profile_path}
						))
					)
					setLoading("loaded")
				})
				.catch((error) => {
					console.error("Error fetching data:", error)
					setLoading("error")
				})
			}, 1000)
		}
	}, [router.isReady, router.query.details])

  return (
    <>
		<Head>
			<title> Details </title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<meta name="author" content="Asadullah Samoon" />
			<meta name="description" content="This the details page of movie website where all the details including title, rating, release date, runtime, box office, cast & crew, description, poster image and other details are displayed" />
			<meta charSet="utf-8" />
		</Head>

		<div className='bg-black min-h-screen'>
			<MovieSearch />
				<div className='flex justify-between my-10 w-[100%] h-48 bg-[#131313]'>
					<div className='ml-10 md:ml-16 lg:ml-20'>
						<p className={`text-[#e2df81] tracking-wide ${fonts.latoMedium} self-start -mx-1 lg:mx-12 pt-10`}> MOVIE </p>
						<p className={`text-white ${fonts.latoMedium} self-start -mx-1 lg:mx-12 text-2xl mt-2 lg:text-3xl`}> {tmdbData && tmdbData.title} </p>
						<p className={`text-[#cdcdcd] ${fonts.latoMedium} self-start -mx-5 lg:mx-9 mt-2`}> <span className='ml-4'> {String(tmdbData.release_date).substring(0, 4)} </span> <span className='ml-3'> {`${Number(tmdbData.runtime/60).toPrecision(1)}h ${tmdbData.runtime%60 === 0 ? "" : `${tmdbData.runtime%60}m`}`} </span> </p>
					</div>

					<div className='mr-10 md:mr-16 lg:mr-20 flex gap-3'>
						<Image src={starIcon} width={50} height={50} alt='Star Icon' /> 
						<p className={`${fonts.latoMedium} text-[24px] text-white self-center`}> {omdbData.imdbRating} </p>
					</div>
				</div>

				<section>
					{loading === "loaded" ? (
						<div className='flex lg:flex-row lg:justify-center lg:ml-52 gap-5 flex-col items-center'>
							{tmdbData.poster_path ?
								<Image src={`${TMDB_IMAGE_URL}${tmdbData.poster_path}`} className="pb-10 rounded-xl" style={{objectFit: "cover"}} width={275} height={275} alt='Movie Poster' />
							:
								<div className='bg-[#585858] rounded-xl h-96 w-72 animate-pulse'></div>
							}
							<div>
								{omdbData.Awards &&
									<div className='ml-3'>
										<div className='border-[1px] border-white bg-yellow-300 w-[50%] lg:w-[15vw] h-[40px] rounded-l-lg inline-block mx-5 lg:mx-0' style={{transform: 'skewX(-20deg)'}}> <p className={`${fonts.latoBold} text-center pt-2`}> Awards and nominations </p> </div>
										<div className='lg:text-[16px] text-[13px] lg:-ml-5 border-[1px] border-white bg-black transform mx-10 w-[80%] lg:w-[30vw] h-[40px] rounded-r-lg inline-block' style={{transform: 'skewX(-30deg)'}}> <p className={`${fonts.latoBold} pl-5 pt-2 text-white`}> {omdbData.Awards} </p> </div>
									</div>
								}
								<ul className='mt-5 flex gap-5 justify-center lg:justify-start'>
									{tmdbData.genres && tmdbData.genres.map((genre, index) => (								
										<li key={index} className={`text-[#cdcdcd] rounded-full bg-[#1b1b1b] py-[4px] md:py-[6px] px-4 md:px-5 text-[14px] md:text-[16px] ${fonts.latoMedium}`}> {genre.name} </li>
									))}
								</ul>
								<p className={`w-[90%] lg:w-[60%] text-[#cdcdcd] mx-5 md:mx-10 lg:mx-3 ${fonts.latoMedium} my-5`}> {tmdbData.overview} </p>
								<p className={`text-[16px] lg:text-[18px] w-[60%] mx-5 md:mx-10 lg:mx-3 ${fonts.latoMedium} my-2`}> <span className='text-[#615f61] text-[18px]'> Director: </span> <span className='text-[#cdcdcd] text-[16px] lg:text-[18px]'> {omdbData.Director} </span> </p>
								<p className={`text-[16px] lg:text-[18px] w-[60%] mx-5 md:mx-10 lg:mx-3 ${fonts.latoMedium} my-2`}> <span className='text-[#615f61] text-[18px]'> Writer: </span> <span className='text-[#cdcdcd] text-[16px] lg:text-[18px]'> {omdbData.Writer} </span> </p>
								<p className={`text-[16px] lg:text-[18px] w-[60%] mx-5 md:mx-10 lg:mx-3 ${fonts.latoMedium} my-2`}> <span className='text-[#615f61] text-[18px]'> Stars: </span> <span className='text-[#cdcdcd] text-[16px] lg:text-[18px]'> {actors} </span> </p>
								<p className={`text-[16px] lg:text-[18px] w-[60%] mx-5 md:mx-10 lg:mx-3 ${fonts.latoMedium} my-2`}> <span className='text-[#615f61] text-[18px]'> Countries of Origin: </span> <span className='text-[#cdcdcd] text-[16px] lg:text-[18px]'> {omdbData.Country} </span> </p>
								<p className={`text-[16px] lg:text-[18px] w-[60%] mx-5 md:mx-10 lg:mx-3 ${fonts.latoMedium} my-2`}> <span className='text-[#615f61] text-[18px]'> Release date: </span> <span className='text-[#cdcdcd] text-[16px] lg:text-[18px]'> {`${month} ${String(tmdbData.release_date).substring(8)}, ${String(tmdbData.release_date).substring(0, 4)}`} </span> </p>
								<p className={`text-[16px] lg:text-[18px] w-[60%] mx-5 md:mx-10 lg:mx-3 ${fonts.latoMedium} my-2`}> <span className='text-[#615f61] text-[18px]'> Box Office: </span> <span className='text-[#cdcdcd] text-[16px] lg:text-[18px]'> {omdbData.BoxOffice} </span> </p>

							</div>
						</div>
				) : loading === "loading..." ? (
					<div className='animate-pulse rounded-xl h-96 mx-10 pb-32 w-72 bg-[#585858]'></div>
				) : (
					<> <Error /> </>
				)}

				<div className='flex justify-center my-10  w-[100%] h-24 bg-[#131313]'>
					
						<p className={`text-center self-center text-4xl text-[#e2df81] tracking-wide ${fonts.latoMedium}`}> CAST </p>
				</div>

				<div className='flex justify-center py-10 flex-wrap gap-5 '>
					{cast && cast.map((actor, index) => (
						<div key={index} className='border-2 border-gray-100 w-[40%] md:w-[25%] lg:w-[15%] h-[330px] md:h-[420px] lg:h-[450px] rounded-lg mx-3 md:mx-5 lg:mx-0'> 
							{actor.profile_path ?
								<a href={`https://en.wikipedia.org/wiki/${actor.name}`} target='_blank'> <Image src={`${TMDB_IMAGE_URL}${actor.profile_path}`} className="pb-1 rounded-xl" style={{objectFit: "cover"}} width={250} height={250} alt='Movie Poster' /> </a>
							:
								<div className='bg-[#585858] rounded-xl h-48 w-48 animate-pulse'></div>
							}
							<p className={`${fonts.latoBold} text-[16px] md:text-2xl text-center pt-1 text-[#615f61]`}> {actor.name} </p> 
							<p className={`${fonts.latoBold} text-center pt-1 text-white`}> {actor.character} </p> 
						</div>
					))}

				</div>

				</section>
		</div>
	</>
  )
}
