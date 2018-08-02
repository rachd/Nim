// state in the form of {
//   player: int,                     the current player (1 or 2)
//   sticks: [int, int, int]          the number of sticks in each pile
//   ai: int                          which player (1 or 2) is the ai
// }

// should return [int, int, int] representing the sticks after the AI moves
const generateMove = (state) => {
    // write your code here! delete the line below, it is just temporary 
    return state.sticks;
}

export {
    generateMove
}