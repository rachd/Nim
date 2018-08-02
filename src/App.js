import React, { Component } from 'react';
import Sticks from "./components/Sticks";
import Picker from "./components/Picker";
import Moves from "./components/Moves";

class App extends Component {
  constructor(props) {
    super(props);
    const sticks = [this.generateSticks(), this.generateSticks(), this.generateSticks()];
    this.state = {
      sticks: sticks,
      currentPlayer: 1,
      error: false,
      finished: false,
      moves: [sticks]
    }
  }

  checkForFinish = (sticks) => {
    return sticks[0] === 0 && sticks[1] === 0 && sticks[2] === 0
  }

  resetGame = () => {
    const sticks = [this.generateSticks(), this.generateSticks(), this.generateSticks()];    
    this.setState({
      sticks: sticks,
      currentPlayer: 1,
      error: false,
      finished: false,
      moves: [sticks]
    });
  }

  switchPlayer = (currentPlayer) => currentPlayer === 1 ? 2 : 1;
  
  generateSticks = () => Math.floor(Math.random() * Math.floor(5)) + 1;

  removeMatches = ({matches, pile}) => {
    if(this.state.sticks[pile] >= matches) {
      const newSticks = this.state.sticks.map((count, index) => index === pile ? count - matches : count);
      if (this.checkForFinish(newSticks)) {
        this.setState(prevState => { return {
          finished: true,
          moves: [...prevState.moves, newSticks]
        }});
      } else {
        this.setState(prevState => { return {
          error: false,
          currentPlayer: this.switchPlayer(prevState.currentPlayer),
          sticks: newSticks,
          moves: [...prevState.moves, newSticks]
        }});
      }
    } else {
      this.setState({error: true});
    }
  }
  
  render () {
    const finished = this.state.finished;
    const game = (
      <div>
        <h1>Current Player: {this.state.currentPlayer}</h1>
        {this.state.error && (<h2>Not enough sticks in the pile</h2>)}
        <Picker onSubmit={this.removeMatches}/>
        <div style={{display: "flex", justifyContent: "space-around", marginTop: 30}}>
          {this.state.sticks.map((num, index) => (
            <Sticks key={index} style={{display:"block"}} number={num} pile={index + 1}/>
          ))}
        </div>
        <Moves moves={this.state.moves}/>
      </div>
    );
    return (
      <div className="App" style={{textAlign: "center"}}>
        {finished ? (
          <div>
            <h1>Player {this.state.currentPlayer} loses</h1>
            <button onClick={this.resetGame}>Play Again</button>
            <Moves moves={this.state.moves}/>
          </div>
        ) : game}
      </div>
    );
  }
}

export default App;
