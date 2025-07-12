import React from 'react';
import Card from '../card/Card';
import './card-list.css';
import { fetchPokemon } from '../../services/API';

import loadingGif from '../../assets/Loading animation.gif';

interface CardListProps {
  name: string;
}

interface PokemonState {
  url: string;
  pokemonName: string;
  description: string;
  loading: boolean;
}

class CardList extends React.Component<CardListProps, PokemonState> {
  state: PokemonState = {
    url: 'https://pokeapi.co/api/v2/pokemon',
    pokemonName: '',
    description: '',
    loading: false,
  };

  async componentDidMount() {
    if (this.props.name) {
      this.loadPokemon();
    }
  }

  async componentDidUpdate(prevProps: CardListProps) {
    if (this.props.name !== prevProps.name) {
      this.loadPokemon();
    }
  }

  loadPokemon = async () => {
    this.setState({ loading: true });

    try {
      const result = await fetchPokemon(this.state.url, this.props.name);

      this.setState({
        pokemonName: result.pokemonName,
        description: result.description,
        loading: false,
      });
    } catch (error) {
      void error;
      this.setState({
        pokemonName: '',
        description: '',
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="card-list">
        {this.state.loading && <img src={loadingGif} alt="Loading..." />}
        {this.state.pokemonName && (
          <Card
            name={this.state.pokemonName}
            description={this.state.description}
          />
        )}
      </div>
    );
  }
}

export default CardList;
