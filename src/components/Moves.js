
import React from "react";

const Moves = ({moves}) => {
    return (
        <div>
            <h3>Prior Moves</h3>
            {moves.map(move => (
                <p>{move.map(pile => (` ${pile} `))}</p>
            ))}
        </div>
    )
}

export default Moves;