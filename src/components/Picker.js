import React, {Component} from "react";

class Picker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: 1,
            pile: 1
        }
        this.changePile = this.changePile.bind(this);
        this.changeMatches = this.changeMatches.bind(this);
        this.submit = this.submit.bind(this);
    }

    changeMatches(e) {
        this.setState({matches: parseInt(e.target.value, 10)});
    }

    changePile(e) {
        this.setState({pile: parseInt(e.target.value, 10)});
    }

    submit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <span>Choose</span>
                <select style={{margin: "0 10px"}} value={this.state.matches} onChange={this.changeMatches}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                <span>from pile</span>
                <select style={{margin: "0 10px"}} value={this.state.pile} onChange={this.changePile}>
                    <option value={0}>1</option>
                    <option value={1}>2</option>
                    <option value={2}>3</option>
                </select>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

export default Picker;