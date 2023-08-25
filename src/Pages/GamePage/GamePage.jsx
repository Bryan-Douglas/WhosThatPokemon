import './GamePage.scss';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function GamePage() {

  const navigate = useNavigate();
  const [activePokemon, setActivePokemon] = useState({
    id: null,
    spriteUrl: null,
    name: null
  });

  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showCorrect, setShowCorrect] = useState(false);
  const [correctGuesses, setCorrectGuesses] = useState([]);

  useEffect(() => {
    const randomPokemonId = generateRandomPokemonId();
    fetchPokemonSprite(randomPokemonId);
  }, []);

  const generateRandomPokemonId = () => {
    return Math.floor(Math.random() * 1004) + 1;
  };

  const fetchPokemonSprite = async () => {
    try {
      const randomPokemonId = generateRandomPokemonId();
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
      const spriteUrl = response.data.sprites.other['official-artwork'].front_default;
      const name = response.data.name;
      setActivePokemon({
        id: randomPokemonId,
        spriteUrl: spriteUrl,
        name: name
      });
    } catch (error) {
      console.error('Error retrieving active pokemon data', error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const checkPokemonName = () => {
    if (inputValue == activePokemon.name) {
      setFeedback('correct');
      setShowCorrect(true);
      handleCorrectGuess(activePokemon);
      setTimeout(() => {
        setShowCorrect(false);
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

  const handleCorrectGuess = (pokemon) => {
    setCorrectGuesses((prevGuesses) => [...prevGuesses, pokemon]);
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
            <div className='pokedex-card' key={index}>
              <img className='pokedex-avatar' src={pokemon.spriteUrl} alt={pokemon.name} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default GamePage;