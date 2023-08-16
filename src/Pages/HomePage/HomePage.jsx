import './HomePage.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TrainerBio from '../../Components/TrainerBio/TrainerBio';

function HomePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function GameClick() {
    navigate('/game');
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <div className='homePage-container'>
        <div className='homePage-leftWrapper'>
          <img className='homePage-trainerCard' src='assets/BryanTrainerCard.png' alt='Bryans Pokemon Trainer Card' onClick={openModal} />
          <button className='homePage-button' onClick={GameClick}> Play The Game!</button>
        </div>
        <div className='homePage-rightWrapper'>This is where the highscores will be!</div>
      </div>
      {showModal && (<TrainerBio closeModal={closeModal} />)}
    </>
  );
}

export default HomePage;