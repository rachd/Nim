// state in the form of [
//    {pile: pile1, player: playerNum}, 
//    {pile: pile2, player: playerNum}, 
//    {pile: pile3, player: playerNum}]

const calculateMoves = (state) => {
    return [...getOneMoves(state), ...getTwoMoves(state), ...getThreeMoves(state)];
}

const getOneMoves = (state) => {
    const moves = [];
    for (let index in state) {
        if (state[index].pile > 0) {
            moves.push(state.map(({pile, player}, i) => {
                return i == index ? {pile: pile - 1, player: switchPlayer(player)}
                    : {pile: pile, player: switchPlayer(player)};
            }));
        }
    }
    return moves;
}

const getTwoMoves = (state) => {
    const moves = [];
    for (let index in state) {
        if (state[index].pile > 1) {
            moves.push(state.map(({pile, player}, i) => {
                return i == index ? {pile: pile - 2, player: switchPlayer(player)}
                    : {pile: pile, player: switchPlayer(player)};
            }));
        }
    }
    return moves;
}

const getThreeMoves = (state) => {
    const moves = [];
    for (let index in state) {
        if (state[index].pile > 2) {
            moves.push(state.map(({pile, player}, i) => {
                return i == index ? {pile: pile - 3, player: switchPlayer(player)}
                    : {pile: pile, player: switchPlayer(player)};
            }));
        }
    }
    return moves;
}

const switchPlayer = (currentPlayer) => currentPlayer === 1 ? 2 : 1;

const calculateUtility = (move) => {
    if(checkForFinish(move)) {
        return calculateScore(move);
    } else {
        return findBestMove(calculateMoves(move));
    }
}

const calculateScore = (move) => {
    const loser = switchPlayer(move.player);
    if (loser === 1) {
        return 1
    } else {
        return -1;
    }
}

const checkForFinish = (move) => {
    return move[0].pile === 0 && move[1].pile === 0 && move[2].pile === 0
}

const convertFromAppState = (appState) => {
    return appState.sticks.map(pile => {
        return {pile: pile, player: appState.currentPlayer}
    });
}

const convertToAppState = (move) => {
    return move.map(({pile, player}) => pile);
}

const findBestMove = (moves) => {
    const player = moves[0].player;
    const utilities = moves.map(move => calculateUtility(move));
    const index = player == 1 ?
        utilities.reduce((lowest, current, index) => current > utilities[lowest] ? index : lowest, 0)
        : utilities.reduce((lowest, current, index) => current < utilities[lowest] ? index : lowest, 0);
    return moves[index];
}

const generateMove = (appState) => {
    const state = convertFromAppState(appState);
    const move = findBestMove(calculateMoves(state));
    return convertToAppState(move);
}

export {
    calculateMoves,
    switchPlayer,
    generateMove
}