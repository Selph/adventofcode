function rockpaperscissor(game) {
    // Normalize inputs
    normalGame = normalizeGame2(game);

    // Crunch scores
	score = 0;
	for (const game of data) {
        score += getResult2(normalGame)
	}
    return score;
}

function normalizeGame2(oldGame) {
    // Prepare opponent
    opponent = {}
    if      (oldGame[0] === 'A') { opponent = { name: 'Rock',    beats: 'Scissor', loses: 'Paper'   }}
    else if (oldGame[0] === 'B') { opponent = { name: 'Paper',   beats: 'Rock',    loses: 'Scissor' }}
    else if (oldGame[0] === 'C') { opponent = { name: 'Scissor', beats: 'Paper',   loses: 'Rock'    }}

    // Prepare player
    player = {}
    if      (oldGame[2] === 'X') { playerStrat = 'lose' }
    else if (oldGame[2] === 'Y') { playerStrat = 'draw' }
    else if (oldGame[2] === 'Z') { playerStrat = 'win'  }

    return {
        'opponent': opponent, 
        'strat': playerStrat
    }
}

function getResult2(game) {
    let choicePoints = {
        'Rock': 1,
        'Paper': 2,
        'Scissor': 3
    }

    // Player plays the appropriate hand with relation to opponent's hand

    // Draw
    if (game.strat === 'draw') return 3 + choicePoints[game.opponent.name];

    // Win
    if (game.strat === 'win')  return 6 + choicePoints[game.opponent.loses];

    // Lose
    if (game.strat === 'lose') return 0 + choicePoints[game.opponent.wins];
}