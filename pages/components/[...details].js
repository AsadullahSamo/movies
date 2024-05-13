import React, { useState, useEffect } from 'react'
import MovieSearch from './MovieSearch'
import fonts from '../../styles/Fonts.module.css'
import starIcon from '../../public/assets/icons/star-icon.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Details() {

	const router = useRouter()
	const [tmdbData, setTmdbData] = useState([])
	const [omdbData, setOmdbData] = useState([])
	const [actors, setActors] = useState('')
	const [month, setMonth] = useState('')
	const [loading, setLoading]	= useState(true)

	useEffect(() => {
		if (router.isReady) {
			fetch(`https://api.themoviedb.org/3/movie/${router.query?.details[1]}?api_key=${process.env.TMDB_API_KEY}`)
			.then((response) => response.json())
			.then((data) => {
				setTmdbData(data)
				setLoading(false)
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
				setLoading(true)
			})
		
			fetch(`http://www.omdbapi.com/?t=${router.query?.details[0]}&apikey=1ce48dc9`)
			.then((response) => response.json())
			.then((data) => {
				setOmdbData(data)
				setLoading(false)
			})
			.catch((error) => {
				console.error("Error fetching data:", error)
				setLoading(true)
			})

			fetch(`https://api.themoviedb.org/3/movie/${router.query.details[1]}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`)
			.then((response) => response.json())
			.then((data, index) => {
				setActors(data.cast.slice(0, 3).map(actor => actor.name).join(', '))
				setLoading(false)
			})
			.catch((error) => {
				console.error("Error fetching data:", error)
				setLoading(true)
			})
		}
	}, [router.isReady, router.query.details])

  return (
    
    <div className='bg-black min-h-screen'>
			<MovieSearch />

			<div className='flex justify-between my-10  w-[100%] h-48 bg-[#131313]'>
				<div className='ml-20'>
					<p className={`text-[#e2df81] tracking-wide ${fonts.latoMedium} self-start mx-12 pt-10`}> MOVIE </p>
					<p className={`text-white ${fonts.latoMedium} self-start mx-12 mt-2 text-3xl`}> {tmdbData && tmdbData.title} </p>
					<p className={`text-[#cdcdcd] ${fonts.latoMedium} self-start mx-9 mt-2`}> <span className='ml-4'> {String(tmdbData.release_date).substring(0, 4)} </span> <span className='ml-3'> {`${Number(tmdbData.runtime/60).toPrecision(1)}h ${tmdbData.runtime%60 === 0 ? "" : `${tmdbData.runtime%60}m`}`} </span> </p>
				</div>

				<div className='mr-20 flex gap-3'>
					<Image src={starIcon} width={50} height={50} alt='Star Icon' /> 
					<p className={`${fonts.latoMedium} text-[24px] text-white self-center`}> {omdbData.imdbRating} </p>
				</div>
			</div>

			<section>
				{!loading ? (
					<div className='flex justify-center ml-52 gap-5'>
						<Image src={`https://image.tmdb.org/t/p/original${tmdbData.poster_path}`} className="pb-10 rounded-xl" style={{objectFit: "cover"}} width={275} height={275} alt='Movie Poster' />
						<div>
							
							<div className='ml-3'>
								<div className='border-[1px] border-white bg-yellow-300 w-[15vw] h-[40px] rounded-l-md inline-block' style={{transform: 'skewX(-20deg)'}}> <p className={`${fonts.latoBold} text-center pt-2`}> Awards and nominations </p> </div>
								<div className='-ml-5 border-[1px] border-white bg-black transform w-[30vw] h-[40px] rounded-r-md inline-block' style={{transform: 'skewX(-30deg)'}}> <p className={`${fonts.latoBold} pl-5 pt-2 text-white`}> {omdbData && omdbData.Awards} </p> </div>
							</div>
							<ul className='mt-5 flex gap-5'>
								{tmdbData.genres && tmdbData.genres.map((genre) => (								
									<li className={`text-[#cdcdcd] rounded-full bg-[#1b1b1b] py-[6px] px-5 ${fonts.latoMedium}`}> {genre.name} </li>
								))}
							</ul>
							<p className={`w-[60%] text-[#cdcdcd] mx-3 ${fonts.latoMedium} my-5`}> {tmdbData.overview} </p>
							<p className={`w-[60%] mx-3 ${fonts.latoMedium} my-2`}> <span className='text-[#615f61] text-[18px]'> Director: </span> <span className='text-[#cdcdcd] text-[18px]'> {omdbData.Director} </span> </p>
							<p className={`w-[60%] mx-3 ${fonts.latoMedium} my-2`}> <span className='text-[#615f61] text-[18px]'> Writer: </span> <span className='text-[#cdcdcd] text-[18px]'> {omdbData.Writer} </span> </p>
							<p className={`w-[60%] mx-3 ${fonts.latoMedium} my-2`}> <span className='text-[#615f61] text-[18px]'> Stars: </span> <span className='text-[#cdcdcd] text-[18px]'> {actors} </span> </p>
							<p className={`w-[60%] mx-3 ${fonts.latoMedium} my-2`}> <span className='text-[#615f61] text-[18px]'> Countries of Origin: </span> <span className='text-[#cdcdcd] text-[18px]'> {omdbData.Country} </span> </p>
							<p className={`w-[60%] mx-3 ${fonts.latoMedium} my-2`}> <span className='text-[#615f61] text-[18px]'> Release date: </span> <span className='text-[#cdcdcd] text-[18px]'> {`${month} ${String(tmdbData.release_date).substring(8)}, ${String(tmdbData.release_date).substring(0, 4)}`} </span> </p>
							<p className={`w-[60%] mx-3 ${fonts.latoMedium} my-2`}> <span className='text-[#615f61] text-[18px]'> Box Office: </span> <span className='text-[#cdcdcd] text-[18px]'> {omdbData.BoxOffice} </span> </p>

						</div>
					</div>
			) : (
				<div className='animate-pulse rounded-xl h-96 mx-10 pb-32 w-72 bg-[#585858]'></div>
			)}
			</section>

    </div>

  )
}
