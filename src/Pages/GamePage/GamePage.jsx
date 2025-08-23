import './GamePage.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PokemonBio from '../../Components/PokemonBio/PokemonBio';
import SubmitScore from '../../Components/SubmitScore/SubmitScore';

function GamePage() {

  const [activePokemon, setActivePokemon] = useState({
    id: null,
    spriteUrl: null,
    name: null,
    types: null,
    height: null,
    weight: null,
    genera: null,
    flavor_text_entries: null
  });

  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showCorrect, setShowCorrect] = useState(false);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [showPokemonModal, setShowPokemonModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [scoreToSubmit, setScoreToSubmit] = useState(0);
<<<<<<< HEAD
=======
  const [isLoading, setIsLoading] = useState(false);
>>>>>>> b0c430a (Initial local commit for stashing)

  function openPokemonModal(pokemon) {
    setSelectedPokemon(pokemon);
    setShowPokemonModal(true);
  }

  function openSubmitModal(score) {
    setShowSubmitModal(true);
    setScoreToSubmit(score);
  }

  function closeModal() {
    setShowPokemonModal(false);
    setShowSubmitModal(false);
  }

  const fetchPokemonSprite = async () => {
<<<<<<< HEAD
=======
    setIsLoading(true);
>>>>>>> b0c430a (Initial local commit for stashing)
    try {
      const response = await axios.get(`http://localhost:3001/api/getRandomPokemon`);
      const pokemonData = response.data;
      setActivePokemon(pokemonData);
    } catch (error) {
      console.error('Error retrieving active pokemon data', error);
<<<<<<< HEAD
=======
    } finally {
      setIsLoading(false);
>>>>>>> b0c430a (Initial local commit for stashing)
    }
  };

  useEffect(() => {
    fetchPokemonSprite();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const checkPokemonName = () => {
    if (inputValue == activePokemon.name) {
      setFeedback('correct');
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setCorrectGuesses(((prevGuesses) => [...prevGuesses, activePokemon]));
        setScore((prevScore) => prevScore + 1)
        fetchPokemonSprite();
        setInputValue('');
        setFeedback('');
      }, 1000);
    } else {
      setFeedback('Incorrect');
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        fetchPokemonSprite();
        setInputValue('');
        setFeedback('');
      }, 1000);
    }
  };

  return (
    <>
<<<<<<< HEAD
      <div className='game-container'>
        <div className='message-container'>
=======
      <div className='game-container' role="main" aria-label="Pokemon guessing game">
        <div className='message-container' role="status" aria-live="polite">
>>>>>>> b0c430a (Initial local commit for stashing)
          {showCorrect && inputValue == activePokemon.name ? (
            <>
              <img className='message-correct' src='./assets/correctpokemon.png' alt='Correct!' />
              <p className='message-text'>it was {activePokemon.name}!</p>
            </>
          ) : showCorrect && inputValue !== activePokemon.name ? (
            <>
              <img className='message-incorrect' src='./assets/incorrectpokemon.png' alt='Incorrect!' />
              <p className='message-text'>it was <strong>{activePokemon.name}!</strong></p>
            </>
          ) : null}
        </div>
<<<<<<< HEAD
        <div className='game-box'>
          <img className='pokemon-avatar' src={activePokemon.spriteUrl} alt={`Pokemon ${activePokemon.id}`} />
        </div>
        <div className='score-container'>
        <img className='score-title' src='./assets/pokemonscore.png' />
        <p className='score-counter'>{score}</p>
        </div>
        <button className='score-submit' type='submit' onClick={() => openSubmitModal(score)}>Submit Score</button>
        <div className='input-wrapper'>
=======
        <div className='game-box' role="img" aria-label={`Pokemon silhouette to guess`}>
          {isLoading ? (
            <div className='loading-spinner'>Loading...</div>
          ) : (
            <img className='pokemon-avatar' src={activePokemon.spriteUrl} alt={`Pokemon ${activePokemon.id}`} />
          )}
        </div>
        <div className='score-container' role="region" aria-label="Score">
        <img className='score-title' src='./assets/pokemonscore.png' alt="Score" />
        <p className='score-counter' aria-label={`Current score: ${score}`}>{score}</p>
        </div>
        <button className='score-submit' type='submit' onClick={() => openSubmitModal(score)} aria-label={`Submit current score of ${score}`}>Submit Score</button>
        <div className='input-wrapper' role="search">
>>>>>>> b0c430a (Initial local commit for stashing)
          <input
            className='game-input'
            type='text'
            placeholder="Who's that pokemon?"
            value={inputValue}
            onChange={handleInputChange}
<<<<<<< HEAD
=======
            aria-label="Enter Pokemon name to guess"
            aria-describedby="pokeball-button"
>>>>>>> b0c430a (Initial local commit for stashing)
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                checkPokemonName();
              }
            }}>
          </input>
          <img
            className='game-button'
            src='assets/pokeball.svg'
            alt='pokeball'
<<<<<<< HEAD
            onClick={checkPokemonName}>
          </img>
        </div>
        <div className='pokedex-border'>
=======
            id="pokeball-button"
            role="button"
            tabIndex="0"
            aria-label="Submit guess"
            onClick={checkPokemonName}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                checkPokemonName();
              }
            }}>
          </img>
        </div>
        <div className='pokedex-border' role="region" aria-label="Pokedex">
>>>>>>> b0c430a (Initial local commit for stashing)
          <div className='pokedex-line'></div>
          <div className='pokedex-title'>Pokedex</div>
          <div className='pokedex-line'></div>
        </div>
<<<<<<< HEAD
        <div className='pokedex-container'>
          {correctGuesses.map((pokemon, index) => (
            <div className='pokedex-card' key={index} onClick={() => openPokemonModal(pokemon)}>
=======
        <div className='pokedex-container' role="list" aria-label="Correctly guessed Pokemon">
          {correctGuesses.map((pokemon, index) => (
            <div className='pokedex-card' key={index} onClick={() => openPokemonModal(pokemon)} role="listitem" tabIndex="0" aria-label={`View details for ${pokemon.name}`} onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openPokemonModal(pokemon);
              }
            }}>
>>>>>>> b0c430a (Initial local commit for stashing)
              <img className='pokedex-avatar' src={pokemon.spriteUrl} alt={pokemon.name} />
            </div>
          ))}
        </div>
      </div>
      {showPokemonModal && (<PokemonBio closeModal={closeModal} pokemon={selectedPokemon} />)}
      {showSubmitModal && (<SubmitScore closeModal={closeModal} scoreToSubmit={score} />)}
    </>
  )
}

export default GamePage;