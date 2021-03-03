import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

function CornerCardResults({ isRed, avatarUrl }) {
  const variantsLeftFadeIn = {
    visible: {
      opacity: 1,
      x: 0
    },
    hidden: {
      opacity: 0,
      x: -200
    }
  };

  const variantsRightFadeIn = {
    visible: {
      opacity: 1,
      x: 0
    },
    hidden: {
      opacity: 0,
      x: 200
    }
  };
  return (
    <motion.div
      variants={isRed ? variantsLeftFadeIn : variantsRightFadeIn}
      initial='hidden'
      animate='visible'
      transition={{ ease: 'easeIn', duration: 0.5 }}
      className={`${
        isRed ? 'bg-red-400' : 'bg-blue-400'
      } w-auto h-auto flex flex-col items-center justify-center p-10 rounded-3xl shadow-md transition-all transform hover:scale-105 hover:shadow-lg`}
    >
      <h2 className='font-bebas text-5xl text-black'>
        {isRed ? 'RED CORNER' : 'BLUE CORNER'}
      </h2>
      <div className='mt-10 transform transition-all hover:-translate-y-2'>
        <img
          className='rounded-full w-28 border-2 border-white'
          src='https://avatars.githubusercontent.com/u/62751844?v=4'
        />
      </div>
      <p className={`font-bebas text-2xl text-center mt-2 text-black`}>
        LUIZFVERISSIMO
      </p>

      <div className='w-full max-w-sm  flex flex-wrap justify-center items-center'>
        <div className='mx-6 my-3 flex flex-col items-center '>
          <h3
            className={`${
              isRed ? 'text-red-900' : 'text-blue-900'
            } font-bebas text-2xl  text-center`}
          >
            PUBLIC REPOS
          </h3>
          <p className="font-bebas text-2xl text-center bg-white rounded-3xl py-4 w-20"> 10 </p>
        </div>
        <div className='mx-6 my-3 w-20'>
          <h3
            className={`${
              isRed ? 'text-red-900' : 'text-blue-900'
            } font-bebas text-2xl  text-center `}
          >
            GITS
          </h3>
          <p className="font-bebas text-2xl text-center bg-white rounded-3xl py-4 w-20"> 10 </p>
        </div>
        <div className='mx-6 my-3'>
          <h3
            className={`${
              isRed ? 'text-red-900' : 'text-blue-900'
            } font-bebas text-2xl  text-center `}
          >
            FOLLOWERS
          </h3>
          <p className="font-bebas text-2xl text-center bg-white rounded-3xl py-4 w-20"> 10 </p>
        </div>
        <div className='mx-6 my-3'>
          <h3
            className={`${
              isRed ? 'text-red-900' : 'text-blue-900'
            } font-bebas text-2xl  text-center `}
          >
            FOLLOWING
          </h3>
          <p className="font-bebas text-2xl text-center bg-white rounded-3xl py-4 w-20"> 10 </p>
        </div>
        <div className='mx-6 my-3'>
          <h3
            className={`${
              isRed ? 'text-red-900' : 'text-blue-900'
            } font-bebas text-2xl  text-center `}
          >
            STARS
          </h3>
          <p className="font-bebas text-2xl text-center bg-white rounded-3xl py-4 w-20"> 10 </p>
        </div>
        
      </div>
      
    </motion.div>
  );
}

export default CornerCardResults;
