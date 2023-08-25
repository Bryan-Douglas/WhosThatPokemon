import './PokemonBio.scss';

function PokemonBio({ closeModal, pokemon }) {

    function capitalizeAndJoinTypes(types) {
        if (!types || types.length === 0) {
          return '';
        }
        return types.map(type => capitalizeFirstLetter(type)).join(' / ');
      }
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <>
            <div className='pokemon-overlay'>
                <div className='pokemon-content'>
                    <div className='pokemon-container'>
                        <div className='pokemon-leftWrapper'>
                            <div className='pokemon-id__wrapper'>
                                <div className='pokemon-id__box'>
                                    <p className='pokemon-id'>No. {pokemon.id}</p>
                                </div>
                                <div className='pokemon-name__box'>
                                    <p className='pokemon-name'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                                </div>
                            </div>
                            <div className='pokemon-sprite__box'>
                                <img className='pokemon-sprite' src={pokemon.spriteUrl} alt={pokemon.spriteUrl} />
                            </div>
                        </div>
                        <div className='pokemon-rightWrapper'>
                            <div className='pokemon-stats__wrapper'>
                                <div className='pokemon-types__box'>
                                <p className='pokemon-types'>{capitalizeAndJoinTypes(pokemon.types)}</p>
                                </div>
                                <div className='pokemon-height__box'>
                                    <p className='pokemon-height'>HT. {pokemon.height}</p>
                                </div>
                                <div className='pokemon-weight__box'>
                                    <p className='pokemon-weight'>WT. {pokemon.weight}</p>
                                </div>
                                <button className='modal-closeButton' onClick={closeModal}>X</button>
                            </div>
                            <div className='pokemon-genera__box'>
                                <p className='pokemon-genera'>{pokemon.genera}</p>
                            </div>
                            <div className='pokemon-flavourText__box'>
                                <p className='pokemon-flavourText'>{pokemon.flavor_text_entries}</p>
                            </div>
                            <div className='pokemon-link__box'>
                                <p className='pokemon-link'>https://bulbapedia.bulbagarden.net/wiki/{pokemon.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PokemonBio;

/* 
https://pokeapi.co/api/v2/pokemon-species/{id or name}
endpoint for the descriptons
*/
