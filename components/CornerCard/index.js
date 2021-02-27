import Image from 'next/image';
import { motion } from 'framer-motion';

function CornerCard({ isRed }) {
  const variantsLeftFadeIn = {
    visible: {
      opacity: 1,
      x: 0
    },
    hidden: {
      opacity: 0,
      x: -30
    }
  };

  const variantsRightFadeIn = {
    visible: {
      opacity: 1,
      x: 0
    },
    hidden: {
      opacity: 0,
      x: 30
    }
  };

  return (
    <motion.div
      variants={isRed ? variantsLeftFadeIn : variantsRightFadeIn}
      initial='hidden'
      animate='visible'
      transition={{ duration: 1 }}
      className={`${
        isRed ? 'bg-red-400' : 'bg-blue-400'
      } w-auto h-auto flex flex-col items-center justify-center p-10 rounded-3xl shadow-md transition-all transform hover:scale-105 hover:shadow-lg`}
    >
      <h2 className='font-bebas text-5xl text-black'>RED CORNER</h2>
      <div className='mt-10 transform transition-all hover:-translate-y-2'>
        <Image
          src={isRed ? '/git-red.svg' : '/git-blue.svg'}
          width={62}
          height={62}
        />
      </div>
      <p
        className={`${
          isRed ? 'text-red-900' : 'text-blue-900'
        } font-bebas text-2xl  text-center mt-5`}
      >
        Enter the contender
        <br />
        username
      </p>
      <input
        type='text'
        className={` ${
          isRed ? 'border-red-900' : 'border-blue-900'
        } outline-none border-b-2  bg-transparent font-bebas text-black text-center text-2xl p-1 mt-5`}
      />
    </motion.div>
  );
}

export default CornerCard;
