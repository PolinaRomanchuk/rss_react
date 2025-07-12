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
}

class CardList extends React.Component<CardListProps, PokemonState> {
  state: PokemonState = {
    pokemons: [],
    loading: false,
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
    } catch (error) {
      void error;
      this.setState({
        pokemons: [],
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="card-list">
        {this.state.loading && <img src={loadingGif} alt="Loading..." />}
        {this.state.pokemons.length > 0 &&
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
