import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import Head from 'next/head';

import api from '../utils/api';
import CornerCardResults from '../components/CornerCardResults';
import { variantsTopFadeIn, variantsZoomIn } from '../utils/animationVariants';

function Winner() {
  const [redCornerStats, setRedCornerStats] = useState({});
  const [blueCornerStats, setBlueCornerStats] = useState({});
  const [redStars, setRedStars] = useState(0);
  const [blueStars, setBlueStars] = useState(0);
  const [redPoints, setRedPoints] = useState(0);
  const [bluePoints, setBluePoints] = useState(0);
  const [winnerIsRed, setWinnerIsRed] = useState(false);
  const [winnerIsBlue, setWinnerIsBlue] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();
  const { blueCorner, redCorner } = router.query;

  const fetchStats = async () => {
    try {
      const resRed = await api.get(`/${redCorner}`);
      setRedCornerStats(resRed.data);

      const resBlue = await api.get(`/${blueCorner}`);
      setBlueCornerStats(resBlue.data);
    } catch (err) {
      console.log(err);
    }
    return;
  };

  const countStars = (repositories) => {
    let stars = 0;
    repositories.map((repo) => {
      stars += repo.stargazers_count;
    });
    return stars;
  };

  const fetchRepoStars = async () => {
    try {
      const resRedRepos = await api.get(`/${redCorner}/repos`);
      setRedStars(countStars(resRedRepos.data));

      const resBlueRepos = await api.get(`/${blueCorner}/repos`);
      setBlueStars(countStars(resBlueRepos.data));
    } catch (err) {
      console.log(err);
    }
    return;
  };

  const compareStats = () => {
    let redCountedPoints = 0;
    let blueCountedPoints = 0;

    if (redStars > blueStars) {
      redCountedPoints += 1;
    } else if (redStars < blueStars) {
      blueCountedPoints += 1;
    }

    if (redCornerStats.public_repos > blueCornerStats.public_repos) {
      redCountedPoints += 1;
    } else if (redCornerStats.public_repos < blueCornerStats.public_repos) {
      blueCountedPoints += 1;
    }

    if (redCornerStats.public_gists > blueCornerStats.public_gists) {
      redCountedPoints += 1;
    } else if (redCornerStats.public_gists < blueCornerStats.public_gists) {
      blueCountedPoints += 1;
    }

    if (redCornerStats.followers > blueCornerStats.followers) {
      redCountedPoints += 1;
    } else if (redCornerStats.followers < blueCornerStats.followers) {
      blueCountedPoints += 1;
    }

    if (redCornerStats.following > blueCornerStats.following) {
      redCountedPoints += 1;
    } else if (redCornerStats.following < blueCornerStats.following) {
      blueCountedPoints += 1;
    }

    setRedPoints(redCountedPoints);
    setBluePoints(blueCountedPoints);
    confettiWinner(redCountedPoints, blueCountedPoints);
  };

  const confettiWinner = (redPoint, bluePoint) => {
    console.log('Placar final:', redPoint, bluePoint);
    if (redPoint > bluePoint) {
      setWinnerIsRed(true);
      return;
    }
    if (redPoint < bluePoint) {
      setWinnerIsBlue(true);
      return;
    }
  };

  const fetchData = async () => {
    await fetchStats();
    await fetchRepoStars();
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!blueCorner || !redCorner) {
      router.push('/');
      return;
    }
    fetchData();
  }, []);

  useEffect(() => {
    compareStats();
  }, [isLoaded]);

  return (
    <>
      <Head>
        <title>The Winner is... | Octo Battle</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex flex-col items-center min-h-screen py-2 bg-white'>
        {winnerIsRed && (
          <Confetti
            recycle={false}
            numberOfPieces={500}
            colors={['#fc0303', '#7a0606', '#ed6d6d', '#a60a0a']}
          />
        )}

        {winnerIsBlue && (
          <Confetti
            recycle={false}
            numberOfPieces={500}
            colors={['#081ea8', '#7183f5', '#030e59', '#0020fc']}
          />
        )}

        <motion.div
          className='mt-10 md:mt-20'
          variants={variantsTopFadeIn}
          initial='hidden'
          animate='visible'
          transition={{ ease: 'easeIn', duration: 0.5, delay: 0.5 }}
          className='w-full flex justify-center my-6 flex-col items-center'
        >
          <img src='/octobattle-logo.svg' className='w-52 h-auto' />
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

        <div className='w-full flex justify-center items-center flex-col lg:flex-row'>
          <CornerCardResults
            isRed
            avatarUrl={redCornerStats.avatar_url}
            profileUrl={redCornerStats.html_url}
            name={redCornerStats.login}
            publicRepos={redCornerStats.public_repos}
            gists={redCornerStats.public_gists}
            followers={redCornerStats.followers}
            following={redCornerStats.following}
            stars={redStars}
          />

          <motion.div
            variants={variantsZoomIn}
            initial='hidden'
            animate='visible'
            transition={{
              type: 'spring',
              stiffness: 100,
              duration: 0.5,
              delay: 1
            }}
            className='flex flex-col items-center justify-center mx-20 my-10'
          >
            <h1
              className={`${
                winnerIsRed ? 'text-red-600' : 'text-blue-600'
              } font-bebas text-5xl mb-6 text-center`}
            >
              {winnerIsRed ? redCornerStats.login : blueCornerStats.login}
              <br />
              IS THE WINNER!
            </h1>
            <img src='/trophy.svg' />
            <button
              onClick={() => router.push('/')}
              className='bg-black font-bebas text-4xl text-white py-4 px-10 rounded-3xl outline-none mt-8 transition-all flex items-center justify-center hover:bg-red-600 transform hover:-translate-y-2'
            >
              NEW ROUND
            </button>
          </motion.div>

          <CornerCardResults
            avatarUrl={blueCornerStats.avatar_url}
            profileUrl={blueCornerStats.html_url}
            name={blueCornerStats.login}
            publicRepos={blueCornerStats.public_repos}
            gists={blueCornerStats.public_gists}
            followers={blueCornerStats.followers}
            following={blueCornerStats.following}
            stars={blueStars}
          />
        </div>
      </div>
    </>
  );
}

export default Winner;
