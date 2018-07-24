import React, { Component } from 'react';
import Sticks from "./components/Sticks";
import Picker from "./components/Picker";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sticks: [this.generateSticks(), this.generateSticks(), this.generateSticks()],
      currentPlayer: 1,
      error: false,
      finished: false
    }
  }

  checkForFinish = (sticks) => {
    return sticks[0] === 0 && sticks[1] === 0 && sticks[2] === 0
  }

  switchPlayer = (currentPlayer) => currentPlayer === 1 ? 2 : 1;
  
  generateSticks = () => Math.floor(Math.random() * Math.floor(19)) + 1;

  removeMatches = ({matches, pile}) => {
    if(this.state.sticks[pile] >= matches) {
      const newSticks = this.state.sticks.map((count, index) => index === pile ? count - matches : count);
      if (this.checkForFinish(newSticks)) {
        this.setState({
          finished: true
        });
      } else {
        this.setState(prevState => { return {
          error: false,
          currentPlayer: this.switchPlayer(prevState.currentPlayer),
          sticks: newSticks
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
        {this.state.sticks.map((num, index) => (
          <Sticks key={index} style={{display:"block"}} number={num} pile={index + 1}/>
        ))}
      </div>
    );
    return (
      <div className="App" style={{textAlign: "center"}}>
        {finished ? (<h1>Player {this.state.currentPlayer} loses</h1>) : game}
      </div>
    );
  }
}

export default App;
