import './GamePage.scss';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function GamePage() {

  const navigate = useNavigate();
  const [activePokemon, setActivePokemon] = useState({
    id: null,
    spriteUrl: null
  });

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
      setActivePokemon({
        id: randomPokemonId,
        spriteUrl: spriteUrl
      });
    } catch (error) {
      console.error('Error retrieving active pokemon data', error);
    }
  };

  return (
    <>
      <div className='game-container'>
        <div className='game-box'>
          <img className='pokemon-avatar' src={activePokemon.spriteUrl} alt={`Pokemon ${activePokemon.id}`} />
        </div>
        <div className='input-wrapper'>
          <input className='game-input' type='text' placeholder="Who's that pokemon?"></input>
          <img className='game-button' src='assets/pokeball.svg' alt='pokeball'></img>
        </div>
        <div className='pokedex-border'>
          <div className='pokedex-line'></div>
          <div className='pokedex-title'>Pokedex</div>
          <div className='pokedex-line'></div>
        </div>
      </div>
    </>
  )
}

export default GamePage;