// state in the form of {
//  player: playerNum,
// [pile1, pile2, pile3]},
// ai: aiPlayerNum

const calculateMoves = (state) => {
    return [...getOneMoves(state), ...getTwoMoves(state), ...getThreeMoves(state)];
}

const getOneMoves = (state) => {
    const moves = [];
    const { sticks, player, ai } = state;
    for (let index in sticks) {
        if (sticks[index] > 0) {
            moves.push({
                player: switchPlayer(player),
                sticks: sticks.map((pile, i) => {
                    return i == index ? pile - 1 : pile
                }),
                ai
            })
        }
    }
    return moves;
}

const getTwoMoves = (state) => {
    const moves = [];
    const { sticks, player, ai } = state;    
    for (let index in sticks) {
        if (sticks[index] > 1) {
            moves.push({
                player: switchPlayer(player),
                sticks: sticks.map((pile, i) => {
                    return i == index ? pile - 2 : pile
                }),
                ai
            })
        }
    }
    return moves;
}

const getThreeMoves = (state) => {
    const moves = [];
    const { sticks, player, ai } = state;    
    for (let index in sticks) {
        if (sticks[index] > 2) {
            moves.push({
                player: switchPlayer(player),
                sticks: sticks.map((pile, i) => {
                    return i == index ? pile - 3 : pile
                }),
                ai
            })
        }
    }
    return moves;
}

const switchPlayer = (currentPlayer) => currentPlayer === 1 ? 2 : 1;

const calculateScore = (move) => {
    const loser = switchPlayer(move.player);
    if (loser === 1) {
        return 1
    } else {
        return -1;
    }
}

const checkForFinish = (move) => {
    const { sticks } = move;
    return sticks[0] === 0 && sticks[1] === 0 && sticks[2] === 0
}

const convertFromAppState = (appState) => {
    return {
        player: appState.currentPlayer,
        sticks: appState.sticks,
        ai: appState.aiPlayer
    }
}

const convertToAppState = (move) => {
    return move.sticks;
}

const findBestMove = (move) => {
    // returns {move, score, ai}
    if (checkForFinish(move)) {
        return {move: move, score: calculateScore(move), ai: move.ai};
    } else {
        const moves = calculateMoves(move);
        if (move.player !== move.ai) {
            // find min
            const scores = moves.map(move => findBestMove(move).score);
            const min = scores.reduce((lowest, current, index) => current < scores[lowest] ? index : lowest, 0);
            return {move: moves[min], score: scores[min], ai: moves[min].ai}
        } else {
            // find max
            const scores = moves.map(move => findBestMove(move).score)
            const max = scores.reduce((highest, current, index) => current > scores[highest] ? index : highest, 0);
            return {move: moves[max], score: scores[max], ai: moves[max].ai}
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