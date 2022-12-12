import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Pokemon.css';

function Pokemon({name}) {
    const [pokemonData, setPokemonData] = useState({});

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemonData(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchPokemon();

    }, []);


    return (

        <section className="poke-card">
            {pokemonData &&
                <>
                    {Object.keys(pokemonData).length > 0 &&
                        <>
                            <h2>{pokemonData.name}</h2>

                            <img
                                alt="Afbeelding pokémon"
                                src={pokemonData.sprites.front_default}
                            />

                            <h3>Moves {pokemonData.moves.length}</h3>
                            <h3>Weight{pokemonData.weight}</h3>
                            <h3>Abilities</h3>

                            <ul >
                                {pokemonData.abilities.map((ability) => {
                                    return (<li key={ability.ability.name}>
                                            {ability.ability.name}
                                        </li>

                                    )
                                })}
                            </ul>
                        </>

                    }


                </>
            }
                </section>

                );
            }
            export default Pokemon;