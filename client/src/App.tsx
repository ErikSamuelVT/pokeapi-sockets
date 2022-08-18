import { useState, useEffect } from 'react'
import pattern from "./components/images/bg-pattern-card.svg";
import './components/css/normalize.css';
import './components/css/estilos.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import io from 'socket.io-client';

const socket = io('http://localhost:4000')

interface pokemon {
  img: string,
  imgJuego: string,
  imgCvg: string,
  name: string,
  experiencia: string,
  hp: string,
  ataque: string,
  defensa: string,
  especial: string,
}

function App() {

  const pokemonObj = {
    img: '',
    imgJuego: '',
    imgCvg: '',
    name: '',
    experiencia: '',
    hp: '',
    ataque: '',
    defensa: '',
    especial: '',
  }

  const [pokemon, setPokemon] = useState<pokemon>(pokemonObj)

  useEffect(() => {
    getPokemon()

    socket.on('click',(message)=>{
      toast(`${message}!`);
    })
  
    return () => {
      socket.off('click',(message)=>{
        console.log(message);
      })
    }

  }, [])

  const handleClick = () => {
    socket.emit('click','Pokemon atrapado')
  }

  const getPokemon = async () => {
    const info = await fetch(`https://pokeapi.co/api/v2/pokemon/charmander`)
    const data = await info.json();

    const infoPokemon: pokemon = {
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      imgJuego: data.sprites.front_default,
      imgCvg: data.sprites.other.dream_world.front_default,
      name: data.name,
      experiencia: data.base_experience,
      hp: data.stats[0].base_stat,
      ataque: data.stats[1].base_stat,
      defensa: data.stats[2].base_stat,
      especial: data.stats[3].base_stat,
    };
    setPokemon(infoPokemon);
  }

  const numRandom = () => {
    const min = 1;
    const max = 151;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return (
    <main className="flex">
      <article className="card">
        <img src={pattern} alt="" className="card-header" />
        <div className="card-body">
          <img src={pokemon.imgJuego} alt={`Pokemon ${pokemon.name}`} className="card-body-img" />
          <h1 className="card-body-title">
            {pokemon.name}
            <span> Hp{pokemon.hp}</span>
          </h1>
          <p className="card-body-text">{pokemon.experiencia}Exp</p>
        </div>
        <div className="card-footer">
          <div className="card-footer-social">
            <h3>{pokemon.ataque}K</h3>
            <p>Ataque</p>
          </div>
          <div className="card-footer-social">
            <h3>{pokemon.especial}K</h3>
            <p>Ataque especial</p>
          </div>
          <div className="card-footer-social">
            <h3>{pokemon.defensa}K</h3>
            <p>Defensa</p>
          </div>
        </div>
        <div className='btn-footer'>
          <button className='btn' onClick={handleClick}>ATRAPAR</button>
          <ToastContainer/>
        </div>
      </article>
    </main>
  )
}

export default App
