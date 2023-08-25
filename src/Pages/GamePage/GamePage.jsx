import './GamePage.scss';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PokemonBio from '../../Components/PokemonBio/PokemonBio';

function GamePage() {

  const navigate = useNavigate();
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

  function openModal(pokemon) {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

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
      const altResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${randomPokemonId}`);
      const spriteUrl = response.data.sprites.other['official-artwork'].front_default;
      const name = response.data.name;
      const types = response.data.types.map(typeObj => typeObj.type.name);
      const height = response.data.height;
      const weight = response.data.weight;
      const genera = altResponse.data.genera[7].genus;
      const flavourText = altResponse.data.flavor_text_entries[0].flavor_text;
      setActivePokemon({
        id: randomPokemonId,
        spriteUrl: spriteUrl,
        name: name,
        types: types,
        height: height,
        weight: weight,
        genera: genera,
        flavor_text_entries: flavourText
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