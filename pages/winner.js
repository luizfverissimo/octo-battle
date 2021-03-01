import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';

import api from '../utils/api';

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

      <button onClick={compareStats}>Compare</button>
      <button onClick={confettiWinner}>winner</button>

      <img src={redCornerStats.avatar_url} />
      <h1>
        {redCornerStats.login} - {redCornerStats.followers} stars: {redStars}
      </h1>
      <img src={blueCornerStats.avatar_url} />
      <h1>
        {blueCornerStats.login} - {blueCornerStats.followers} stars: {blueStars}
      </h1>
    </div>
  );
}

export default Winner;
