import { syncReadFile } from '../utils/syncReadFile.js'

function rockpaperscissor() {
    let game = syncReadFile('./rps.txt')
    // Give meaning to inputs
    let round = createRound(game[0], game[2]);

    // Crunch the score
	score = 0;
	for (const game of data) {
        score += defaultPoints(round.player.choice)
        score += resultPoints(round)
	}

    return score;
}

function createRound(rawOpponent, rawPlayer) {
    let properties = new function() {
        this.A = this.X = { choice: 'Rock',    beats: 'Scissor', loses: 'Paper'   }
        this.B = this.Y = { choice: 'Paper',   beats: 'Rock',    loses: 'Scissor' }
        this.C = this.Z = { choice: 'Scissor', beats: 'Paper',   loses: 'Rock'    }
    }

    return {
        'opponent': properties[rawOpponent], 
        'player':   properties[rawPlayer]
    }
}

function defaultPoints(choice) {
    let points = {
        'Rock':    1,
        'Paper':   2,
        'Scissor': 3
    }
    return points[choice]
}

function resultPoints(round) {
    let points = {
        'Draw': 3,
        'Win':  6,
        'Lose': 0
    }
    // Draw
    if (round.opponent.choice === round.player.choice) return points.Draw;

    // Win
    if (round.opponent.choice === round.player.beats)  return points.Win;

    // Lose
    if (round.opponent.choice === round.player.loses)  return points.Lose;
}

console.log(rockpaperscissor())