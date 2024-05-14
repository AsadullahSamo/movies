import React, { useState, useEffect } from 'react'
import MovieSearch from './MovieSearch'
import fonts from '../../styles/Fonts.module.css'
import starIcon from '../../public/assets/icons/star-icon.svg'
import plugError from '../../public/assets/icons/plug-error-illustration.svg'
import Image from 'next/image'
import Head from 'next/head'

export default function Error() {

  return (
    <>
      <Head>
        <title> Error Page </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Asadullah Samoon" />
        <meta name="description" content="This is the page which is responsible for user friendly error message display if something goes wrong" />
        <meta charSet="utf-8" />
      </Head>

      <div className='bg-black min-h-screen'>
        <MovieSearch />		
        <div className='flex flex-col items-center justify-center mt-36 gap-5'>
          <Image className='mx-auto mt-20' src={plugError} alt='plug' width={250} height={250} />
          <p className={`text-white text-3xl ${fonts.latoRegular}`}> Oops... </p>
          <p className={`text-[#585858] text-xl ${fonts.latoBold}`}> Something went wrong </p>
          <button className={`bg-yellow-500 w-32 h-12 rounded-md hover:cursor-pointer border-2 hover:border-white hover:bg-black hover:text-white transition-all duration-500 text-[20px] text-center ${fonts.latoMeduim} py-2 px-3`}> Refresh </button>
        </div>
      </div>
    </>

  )
}
