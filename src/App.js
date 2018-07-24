import React, { Component } from 'react';
import Sticks from "./components/Sticks";
import Picker from "./components/Picker";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sticks: [this.generateSticks(), this.generateSticks(), this.generateSticks()],
      currentPlayer: 1,
      error: false
    }
  }

  switchPlayer = (currentPlayer) => currentPlayer === 1 ? 2 : 1;
  
  generateSticks = () => Math.floor(Math.random() * Math.floor(20));

  removeMatches = ({matches, pile}) => {
    if(this.state.sticks[pile] >= matches) {
      this.setState(prevState => { return {
        error: false,
        currentPlayer: this.switchPlayer(prevState.currentPlayer),
        sticks: prevState.sticks.map((count, index) => index === pile ? count - matches : count)
      }})
    } else {
      this.setState({error: true});
    }
  }
  
  render () {
    return (
      <div className="App">
        <h1>Current Player: {this.state.currentPlayer}</h1>
        {this.state.sticks.map((num, index) => (
          <Sticks key={index} style={{display:"block"}} number={num} pile={index + 1}/>
        ))}
        {this.state.error && (<h2>Not enough sticks in the pile</h2>)}
        <Picker onSubmit={this.removeMatches}/>
      </div>
    );
  }
}

export default App;
