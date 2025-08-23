import './HomePage.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TrainerBio from '../../Components/TrainerBio/TrainerBio';
import axios from 'axios';

function HomePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [scores, setScores] = useState([]);

  function GameClick() {
    navigate('/game');
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  async function fetchScores() {
    try {
      const response = await axios.get('http://localhost:3001/api/scores');
      return response.data; // Assuming your scores are returned as an array
    } catch (error) {
      console.error('Error fetching scores:', error);
      return []; // Return an empty array in case of an error
    }
  }

  useEffect(() => {
    fetchScores().then((data) => {
      setScores(data);
    });
  }, []);

  useEffect(() => {
    fetchScores().then((data) => {
      // Sorts the scores by score value in descending order
      const sortedScores = data.sort((a, b) => b.score - a.score);
      setScores(sortedScores);
    });
  }, []);

  return (
    <>
      <div className='homePage-container'>
        <div className='homePage-leftWrapper'>
        <button className='homePage-button' onClick={GameClick}> Play The Game!</button>
          <img className='homePage-trainerCard' src='assets/BryanTrainerCard.png' alt='Bryans Pokemon Trainer Card' onClick={openModal} />          
        </div>
        <div className='homePage-rightWrapper'>
          <div className='homePage-highscores__container'>
            <div className='homePage-highscores__table__head'>
              <div className='homePage-highscores__head__title__rank'>Rank</div>
              <div className='homePage-highscores__head__title__name'>Name</div>
              <div className='homePage-highscores__head__title__score'>Score</div>
            </div>
            <div className='homePage-highscores__row__container'>
              {scores.map((score, index) => (
                <div className='homePage-highscores__row__content' key={index}>
                  <div className='homePage-highscores__rank'>{index + 1}</div>
                  <div className='homePage-highscores__name'>{score.name}</div>
                  <div className='homePage-highscores__score'>{score.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (<TrainerBio closeModal={closeModal} />)}
    </>
  );
}

export default HomePage;