import React from 'react';
import Card from '../card/Card';
import './card-list.css';
import { fetchAllPokemons, fetchPokemonByName } from '../../services/API';

import loadingGif from '../../assets/Loading animation.gif';

interface CardListProps {
  name: string;
}

interface PokemonState {
  pokemons: { pokemonName: string; description: string }[];
  loading: boolean;
  error: boolean;
}

class CardList extends React.Component<CardListProps, PokemonState> {
  state: PokemonState = {
    pokemons: [],
    loading: false,
    error: false,
  };

  async componentDidMount() {
    this.loadPokemon();
  }

  async componentDidUpdate(prevProps: CardListProps) {
    if (this.props.name !== prevProps.name) {
      this.loadPokemon();
    }
  }

  loadPokemon = async () => {
    this.setState({ loading: true });

    try {
      if (this.props.name) {
        const result = await fetchPokemonByName(this.props.name);
        this.setState({
          pokemons: result.pokemons,
          loading: false,
        });
      } else {
        const result = await fetchAllPokemons();
        this.setState({
          pokemons: result.pokemons,
          loading: false,
        });
      }
    } catch (error: unknown) {
      this.setState({ error: true });
      localStorage.setItem('searchInput', '');
      void error;
    }
  };

  render() {
    if (this.state.error) {
      throw new Error('Error getting pokemon');
    }
    return (
      <div className="card-list">
        {this.state.loading && <img src={loadingGif} alt="Loading..." />}
        {!this.state.loading &&
          this.state.pokemons.length > 0 &&
          this.state.pokemons.map((pokemon) => (
            <Card
              name={pokemon.pokemonName}
              description={pokemon.description}
              key={pokemon.pokemonName}
            />
          ))}
      </div>
    );
  }
}

export default CardList;
