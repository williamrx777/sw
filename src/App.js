import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      codigo: 1,
      url: ''
      
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(`https://wilflix.onrender.com/SW/${this.state.codigo}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          url: data.url
         
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  handleInputChange = (event) => {
    this.setState({ codigo: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchData();
  };

  handlePreviousEpisode = () => {
    if (this.state.codigo > 1) {
      this.setState((prevState) => ({
        codigo: prevState.codigo - 1,
      }), this.fetchData);
    }
  };

  
  handleNextEpisode = () => {
    this.setState((prevState) => ({
      codigo: prevState.codigo + 1,
    }), this.fetchData);
  };
  
  render() {
    return (
      <div className="container text-center">
        <h1 style={{ color: 'white' }} className="h1 text-center">
          Samurai Warriors
        </h1>
        <form className='busca' onSubmit={this.handleSubmit}>
          <input
            type="number"
            name="codigo"
            placeholder="Pesquise número do episódio"
            value={this.state.codigo}
            onChange={this.handleInputChange}
          />
          <br />
          <input className="btn btn-outline-primary" type="submit" value="submit" />
        </form>

        {this.state.codigo > 1 && (
        <button
          className="btn btn-success"
          onClick={this.handlePreviousEpisode}
        >
          Voltar
        </button>
      )}


        <iframe 
          width="640"
          height="360"
          frameBorder="0"
          src={this.state.url}
          allowFullScreen
        ></iframe>

        {this.state.codigo < 39 && (
        <button
          className="btn btn-primary"
          onClick={this.handleNextEpisode}
        >
          Próximo
        </button>
      )}
      </div>
    );
  }
}

export default App;
