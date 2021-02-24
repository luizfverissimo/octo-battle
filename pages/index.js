import Head from 'next/head';
import Image from 'next/image';
import CornerCard from '../components/CornerCard';
import Tilt from 'react-parallax-tilt';

export default function Home() {
  return (
    <div className='flex flex-col items-center min-h-screen py-2 bg-white'>
      <Head>
        <title>Octo Battle</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='w-full max-w-screen-2xl min-h-screen flex flex-col items-center'>
        <div className='mt-10 md:mt-20'>
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
        </div>

        <div className='w-full flex justify-center items-center mt-10 flex-col md:flex-row '>
          <CornerCard isRed />
          <div className='w-auto flex flex-col items-center p-20'>
            <h3 className='font-bebas text-7xl text-red-600'>VS.</h3>
            <button className='bg-black font-bebas text-4xl text-white py-4 px-10 rounded-3xl mt-5 transition-all flex items-center justify-center hover:bg-red-600 transform hover:-translate-y-2'>
              FIGHT!
            </button>
          </div>
          <CornerCard />
        </div>
      </main>
    </div>
  );
}
