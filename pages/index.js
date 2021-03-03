import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import CornerCard from '../components/CornerCard';
import {
  variantsTopFadeIn,
  variantsZoomIn,
  variantsMoveFromLeft,
  variantsMoveFromRight
} from '../utils/animationVariants';

export default function Home() {
  const [redCorner, setRedCorner] = useState('');
  const [blueCorner, setBlueCorner] = useState('');

  const router = useRouter();

  const handleWinner = () => {
    if(redCorner.length === 0 || blueCorner.length === 0) {
      alert('All fighters are need for this round!')
      return
    }
    router.push({
      pathname: '/winner',
      query: {
        redCorner,
        blueCorner
      }
    })
    return
  };

  return (
    <div className='flex flex-col items-center min-h-screen py-2 bg-white'>
      <Head>
        <title>Octo Battle</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='w-full h-full fixed top-0 left-0 flex z-10 pointer-events-none'>
        <motion.div
          variants={variantsMoveFromLeft}
          initial='hidden'
          animate='visible'
          transition={{ ease: 'easeIn', duration: 1 }}
          className='bg-red-600 w-1/2'
        ></motion.div>
        <motion.div
          variants={variantsMoveFromRight}
          initial='hidden'
          animate='visible'
          transition={{ ease: 'easeIn', duration: 1 }}
          className='bg-blue-600 w-1/2'
        ></motion.div>
      </div>

      <main className='w-full max-w-screen-2xl min-h-screen flex flex-col items-center'>
        <motion.div
          className='mt-10 md:mt-20'
          variants={variantsTopFadeIn}
          initial='hidden'
          animate='visible'
          transition={{ ease: 'easeIn', duration: 0.5 }}
        >
          <Tilt>
            <Image
              src='/octobattle-logo.svg'
              width={300}
              height={300}
              layout='intrinsic'
            />
          </Tilt>
          <p className='font-bebas text-center '>
            Created by{' '}
            <a
              className='underline transition-all hover:text-red-600'
              target='_blank'
              href='http://lfverissimo.com'
            >
              LF Verissimo
            </a>
          </p>
        </motion.div>

        <div className='w-full flex justify-center items-center mt-10 flex-col md:flex-row '>
          <CornerCard
            isRed
            cornerValue={redCorner}
            setCornerValue={setRedCorner}
          />
          <motion.div
            variants={variantsZoomIn}
            initial='hidden'
            animate='visible'
            transition={{
              type: 'spring',
              stiffness: 100,
              duration: 0.5,
              delay: 0.5
            }}
            className='w-auto flex flex-col items-center p-20'
          >
            <h3 className='font-bebas text-7xl text-red-600'>VS.</h3>
            <button
              onClick={() => handleWinner()}
              className='bg-black font-bebas text-4xl text-white py-4 px-10 rounded-3xl outline-none mt-5 transition-all flex items-center justify-center hover:bg-red-600 transform hover:-translate-y-2'
            > 
              FIGHT!
            </button>
          </motion.div>
          <CornerCard cornerValue={blueCorner} setCornerValue={setBlueCorner} />
        </div>
      </main>
    </div>
  );
}
