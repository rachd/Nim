import React from 'react';

const Sticks = ({number, pile}) => {
    const sticks = Array(number).fill(0);
    return (
        <div>
            <p>Pile {pile}: {number} matches</p>
            {sticks.map((stick, index) => (
                <svg key={index} width="20" height="210">
                    <rect width="10" height="200" style={{fill:'rgb(0,0,255)',strokeWidth:3,stroke:'rgb(0,0,0)'}} />
                </svg>
            ))}
        </div>
    );
}

export default Sticks;