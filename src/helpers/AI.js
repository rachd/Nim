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
                return i === index ? {pile: pile - 1, player: switchPlayer(player)}
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
                return i === index ? {pile: pile - 2, player: switchPlayer(player)}
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
                return i === index ? {pile: pile - 3, player: switchPlayer(player)}
                    : {pile: pile, player: switchPlayer(player)};
            }));
        }
    }
    return moves;
}

const switchPlayer = (currentPlayer) => currentPlayer === 1 ? 2 : 1;

const calculateScore = (move) => {
    const loser = switchPlayer(move[0].player);
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

const findBestMove = (move) => {
    // returns {move, score}
    if (checkForFinish(move)) {
        return {move: move, score: calculateScore(move)};
    } else {
        const moves = calculateMoves(move);
        if (move[0].player === 1) {
            // find min
            const scores = moves.map(move => findBestMove(move).score);
            const min = scores.reduce((lowest, current, index) => current < scores[lowest] ? index : lowest, 0);
            return {move: moves[min], score: scores[min]}
        } else {
            // find max
            const scores = moves.map(move => findBestMove(move).score)
            const max = scores.reduce((highest, current, index) => current > scores[highest] ? index : highest, 0);
            return {move: moves[max], score: scores[max]}
        }
    }
}

const generateMove = (appState) => {
    const state = convertFromAppState(appState);
    const move = findBestMove(state).move;
    return convertToAppState(move);
}

export {
    calculateMoves,
    switchPlayer,
    generateMove
}