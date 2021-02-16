// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { useEffect, useState } from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <details style={{whiteSpace: 'pre-wrap'}}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      )
    }
    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  // const [pokemon, setPokemon] = useState(null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this
  // const [error, setError] = useState(null)
  // const [status, setStatus] = useState('idle')
  const [state, setState] = useState({
    pokemon: null,
    status: 'idle',
    error: null,
  })

  const {pokemon, status, error} =  state

  useEffect(() => {
    if (!pokemonName)
      return 

    setState({ 
      pokemon: null,
      status: 'pending',
      error: null
    })

    // setError(null)
    // setPokemon(null)
    // setStatus('pending')

    async function effect() {
      try {
        const fetchedPokemon = await fetchPokemon(pokemonName, 0)
        setState({
          pokemon: fetchedPokemon,
          status: 'resolved',
        })
        // setPokemon(fetchedPokemon)
        // setStatus('resolved')
      } catch (err) {
        setState({
          error: err.message,
          status: 'rejected',
        })
        throw new Error('Unknown Pokemon')
        // setError(err.message)
        // setStatus('rejected')
      }
    }
    effect()
    // fetchPokemon(pokemonName).then(pokemon => setPokemon(pokemon))
  }, [pokemonName])

  console.log(state)
  if (status === 'idle')
    return 'Submit a Pokemon'
  if (status === 'rejected')
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error}</pre>
      </div>
    )
  if (status === 'pending')
    return <PokemonInfoFallback name={pokemonName} />
  if (status === 'resolved')
    return <PokemonDataView pokemon={pokemon} />  
  
  throw new Error('This should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
