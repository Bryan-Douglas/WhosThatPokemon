import './GamePage.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PokemonBio from '../../Components/PokemonBio/PokemonBio';

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
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [score, setScore] = useState(0);

  function openModal(pokemon) {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  const fetchPokemonSprite = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getRandomPokemon`);
      const pokemonData = response.data;
      setActivePokemon(pokemonData);
    } catch (error) {
      console.error('Error retrieving active pokemon data', error);
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
      <div className='game-container'>
        <div className='message-container'>
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
        <div className='game-box'>
          <img className='pokemon-avatar' src={activePokemon.spriteUrl} alt={`Pokemon ${activePokemon.id}`} />
        </div>
        <img className='score-title' src='./assets/pokemonscore.png' />
        <p className='score-counter'>{score}</p>
        <div className='input-wrapper'>
          <input
            className='game-input'
            type='text'
            placeholder="Who's that pokemon?"
            value={inputValue}
            onChange={handleInputChange}
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
            onClick={checkPokemonName}>
          </img>
        </div>
        <div className='pokedex-border'>
          <div className='pokedex-line'></div>
          <div className='pokedex-title'>Pokedex</div>
          <div className='pokedex-line'></div>
        </div>
        <div className='pokedex-container'>
          {correctGuesses.map((pokemon, index) => (
            <div className='pokedex-card' key={index} onClick={() => openModal(pokemon)}>
              <img className='pokedex-avatar' src={pokemon.spriteUrl} alt={pokemon.name} />
            </div>
          ))}
        </div>
      </div>
      {showModal && (<PokemonBio closeModal={closeModal} pokemon={selectedPokemon} />)}
    </>
  )
}

export default GamePage;