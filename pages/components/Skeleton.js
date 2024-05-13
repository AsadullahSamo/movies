import React, { useState, useEffect } from 'react'
import MovieSearch from './MovieSearch'
import fonts from '../../styles/Fonts.module.css'
import starIcon from '../../public/assets/icons/star-icon.svg'
import Image from 'next/image'

export default function Skeleton() {

	const [featuredToday, setFeaturedToday] = useState([])
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		setTimeout(() => {
			fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`)
			.then((response) => response.json())
			.then((data) => {
				setFeaturedToday(data)
				setLoading(false)
			})
			.catch((error) => {
				console.error("Error fetching data:", error)
				setLoading(true)
			})
		} , 2000)

		console.log(featuredToday.results)
	} , [])

  return (
    
    <div className='bg-black min-h-screen'>
			<MovieSearch />

			<div className='flex justify-between my-10  w-[100%] h-48 bg-[#585858] animate-pulse'>
				
			</div>

			<div className='mb-10 max-w-[100%] overflow-auto ml-1 mr-1 self-start flex h-[450px] gap-5'>
				{loading ?
					Array.from({ length: 10 }).map((_, index) => (
						<div className='ml-5 animate-pulse rounded-xl h-60 w-[500px] bg-[#585858]'> </div>
					))
				:
					<>
						{featuredToday.results && featuredToday.results.map((movie, index) => (
								<div className='mt-2 flex flex-col gap-2 m-3'>
								<Image style={{ minWidth: '200px', objectFit: 'cover' }} className='rounded-xl self-center mx-1' src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} width={200} height={200} alt='Poster image'/>
								</div>
						))}
					</>
				}
      </div>

			
    </div>

  )
}
