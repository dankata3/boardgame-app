import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import axiosInstance from './axios-instance';
import axios from 'axios';
import Context from './context/context';
import Games from './containers/Games/Games';
import Players from './containers/Players/Players';
import Results from './containers/Results/Results';
import Spinner from './components/Spinner/Spinner';

class App extends Component {
  constructor() {
    super();

    this.state = {
      maxPlayers: 4,
      players: [
        // {
        //   id: 1,
        //   name: 'Dani',
        //   color: 'blue'
        // },
        // {
        //   id: 2,
        //   name: 'Vlado',
        //   color: 'red'
        // },
        // {
        //   id: 3,
        //   name: 'Petya',
        //   color: 'green'
        // },
        // {
        //   id: 4,
        //   name: 'Sasho',
        //   color: 'purple'
        // }
      ],
      games: [
        // {
        //   id: 1,
        //   name: 'Terraforming Mars',
        //   bggLink: ''
        // },
        // {
        //   id: 2,
        //   name: 'Seasons'
        // },
        // {
        //   id: 3,
        //   name: 'Ganzshon'
        // },
        // {
        //   id: 4,
        //   name: 'Villagers'
        // }
      ],
      gameSessions: [
        // {
        //   sessionId: 695393,
        //   date:
        //     'Thu Mar 12 2020 12:31:22 GMT+0200 (Eastern European Standard Time)',
        //   gameId: 1,
        //   sessionPlayers: [
        //     {
        //       id: 1,
        //       score: 200
        //     },
        //     {
        //       id: 2,
        //       score: 160
        //     },
        //     {
        //       id: 3,
        //       score: 150
        //     },
        //     {
        //       id: 4,
        //       score: 100
        //     }
        //   ]
        // },
        // {
        //   sessionId: 435256,
        //   date:
        //     'Thu Mar 12 2020 12:31:22 GMT+0200 (Eastern European Standard Time)',
        //   gameId: 2,
        //   sessionPlayers: [
        //     {
        //       id: 2,
        //       score: 200
        //     },
        //     {
        //       id: 1,
        //       score: 160
        //     },
        //     {
        //       id: 4,
        //       score: 150
        //     },
        //     {
        //       id: 3,
        //       score: 100
        //     }
        //   ]
        // }
      ],
      loading: false,
    };
  }

  recordSession = (gameSession) => {
    axiosInstance
      .post('/gameSessions.json', gameSession)
      .then((response) => {
        this.setState((prevState) => {
          const sessionFormattedObj = {
            sessionId: response.data.name,
            gameDate: gameSession.gameDate,
            gameId: gameSession.gameId,
            sessionPlayers: gameSession.sessionPlayers,
          };
          const gameSessions = prevState.gameSessions.concat(
            sessionFormattedObj
          );
          return {
            ...prevState,
            gameSessions,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addPlayer = (player) => {
    const formattedGameObj = {
      name: player.name.value,
      color: player.color.value,
    };
    axiosInstance.post('/players.json', formattedGameObj).then((response) => {
      this.setState((prevState) => {
        const formattedPlayer = {
          id: response.data.name,
          name: formattedGameObj.name,
          color: formattedGameObj.bggLink,
        };
        const players = prevState.players.concat(formattedPlayer);

        return {
          ...prevState,
          players,
        };
      });
    });
  };

  addGame = (game) => {
    const formattedGameObj = {
      name: game.name.value,
      bggLink: game.bggLink.value,
    };
    axiosInstance.post('/games.json', formattedGameObj).then((response) => {
      this.setState((prevState) => {
        const formattedGame = {
          id: response.data.name,
          name: formattedGameObj.name,
          bggLink: formattedGameObj.bggLink,
        };
        const games = prevState.games.concat(formattedGame);

        return {
          ...prevState,
          games,
        };
      });
    });
  };

  componentDidMount() {
    const gamesRequest = axiosInstance.get('/games.json');
    const playersRequest = axiosInstance.get('/players.json');
    const resultsRequest = axiosInstance.get('/gameSessions.json');

    axios
      .all([gamesRequest, playersRequest, resultsRequest])
      .then(
        axios.spread((...responses) => {
          const [gamesResponse, playersResponse, resultsResponse] = responses;
          let games = [];
          let players = [];
          let gameSessions = [];

          for (let key in gamesResponse.data) {
            games.push({
              id: key,
              name: gamesResponse.data[key].name,
              bggLink: gamesResponse.data[key].bggLink,
            });
          }

          for (let key in playersResponse.data) {
            players.push({
              id: key,
              name: playersResponse.data[key].name,
              color: playersResponse.data[key].color,
            });
          }

          for (let key in resultsResponse.data) {
            gameSessions.push({
              sessionId: key,
              gameDate: resultsResponse.data[key].gameDate,
              gameId: resultsResponse.data[key].gameId,
              sessionPlayers: resultsResponse.data[key].sessionPlayers,
            });
          }
          debugger;
          this.setState((prevState) => {
            return {
              ...prevState,
              players,
              games,
              gameSessions,
            };
          });
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <Context.Provider
          value={{
            maxPlayers: this.state.maxPlayers,
            players: this.state.players,
            games: this.state.games,
            gameSessions: this.state.gameSessions,
            recordSession: this.recordSession,
            addPlayer: this.addPlayer,
            addGame: this.addGame,
          }}
        >
          <Layout>
            <Switch>
              <Route path="/" exact component={Results} />
              <Route path="/players" component={Players} />
              <Route path="/games" component={Games} />
            </Switch>
          </Layout>
        </Context.Provider>
      </div>
    );
  }
}

export default App;
