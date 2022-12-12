import React, {useState, useEffect} from 'react';
import './App.css';
import Pokemon from './components/pokemon/Pokemon';
import Button from './components/button/Button';
import axios from 'axios';
import pikachu from './assets/pikachu.gif';
import logo from './assets/logo.jpg';

function App() {
    const [pokemonArray, setPokemonArray] = useState([]);
    const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [isLoading, setLoading] = useState(false);
    const [catchError, setCatchError] = useState(null);


    useEffect(() => {
        async function fetchEmAll() {
            setLoading(true);
            setCatchError(false);


            try {
                const response = await axios.get(endpoint);
                console.log(response);
                setPokemonArray(response.data);

            } catch (e) {
                console.error(e);
                setCatchError(true);

            }
            setLoading(false);

        }

        fetchEmAll();
    }, [endpoint]);

    return (
        <>
            <section className="logo">
                <img src={logo} alt="pokemon logo" width="400px"/>

            </section>
            <div className="poke-deck">

                <>
                    {Object.keys(pokemonArray).length > 0 &&

                        <>
                            <ul className="outer-container-poke-card">
                                {pokemonArray.results.map((pokemons) => {
                                    return (
                                        <Pokemon name={pokemons.name} key={pokemons.name}/>);
                                })}
                            </ul>


                        </>
                    }
                </>
                {isLoading &&
                    <>
                        <img src={pikachu} alt="Gif of pikachu running" width="300px"/>
                        <p>Pikachu is catching your Pokémon...</p>
                    </>
                }
                {catchError && <p>Something went wrong with catching your pokemon ..</p>}


            </div>

            <p className="button">
                <Button
                    disabled={!pokemonArray.previous}
                    clickHandler={() => setEndpoint(pokemonArray.previous)}
                >

                    Vorige
                </Button>

                <Button
                    clickHandler={() => setEndpoint(pokemonArray.next)}
                >
                    Volgende
                </Button>
                <img src={pikachu} alt="Gif of pikachu running" width="100px"/>
            </p>



        </>

    );
}

export default App;
