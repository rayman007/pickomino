import React from 'react';
import Domino from './domino.js'
import Dice from './dice.js';
import Player from './player.js'
import { handleDiceClick } from './handlers.js';
import { handleDominoClick } from './handlers.js';
import { getRandomDice } from './handlers.js';
import { handleKeep } from './handlers.js';
import { handleRoll } from './handlers.js';
import { handleAbandon } from './handlers.js';
import { computeTempScore } from './handlers.js';
import { computeApproxScore } from './handlers.js';
import { computeExactScore } from './handlers.js';
import { isDiceSelectable } from './handlers.js';

const initial_dominos = 
    [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36 ]

const dominos_value = 
    [ 1, 1 , 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4 ]

function getDominoValue(v) {
    if (v < 21)
        return 0
    if (v > 36)
        return 0
    return dominos_value[v - 21]
}
   
class Board extends React.Component {

    constructor(props) {

        super(props)
        var dices = Array(8)
        for(let i = 0 ; i < 8 ; i++) {
            dices[i] = getRandomDice()
        }
        this.state = {

            // Dices
            rdices: dices,
            kdices: Array(0),

            // Dices selection
            selected: null,
            kept: false,

            // Dominos
            dominos: initial_dominos,

            // Players
            players_number: 2,
            current_player: 0,
            players: [
                {name: "Florian", dominos : Array(0)},
                {name: "Aurélie", dominos : Array(0)},
            ]

        }
    }

    render() {

        return (
            <div class='board'>
                <div class='domino_container'>
                    {this.state.dominos.map(domino => (
                        <Domino 
                            value={domino}
                            handleDominoClick={handleDominoClick.bind(this, domino)}
                            current_score={this.state.kept ? computeApproxScore(this.state.kdices, this.state.dominos) : 0}
                        />
                    ))}               
                </div>
                <div class='dice_container'>
                {this.state.rdices.map(dice => (
                        <Dice 
                            value={dice}
                            handleDiceClick={handleDiceClick.bind(this, dice)}
                            selected={dice === this.state.selected}
                            selectable={(isDiceSelectable(dice, this.state.kdices)) && (!this.state.kept)}
                        />
                ))}
                </div>
                <div class='dice_container'>
                {this.state.kdices.map(dice => (
                        <Dice 
                            value={dice}
                            selectable={false}
                        />
                    ))} 
                </div>
                <div class='cmd_container'>
                    <button disabled={this.state.kept} onClick={handleKeep.bind(this)}>Garder</button>               
                    <button disabled={!this.state.kept} onClick={handleRoll.bind(this)}>Relancer</button>               
                    <button onClick={handleAbandon.bind(this)}>Abandonner</button>               
                    Total : {computeTempScore(this.state.kdices)}               
                </div>
                <div class='players_container'>
                {this.state.players.map((player, index) => (
                        <Player 
                            name={player.name}
                            dominos={player.dominos}
                            handleDominoClick={handleDominoClick.bind(this, player.dominos[0])}
                            current_player={index === this.state.current_player}
                            current_score={this.state.kept ? computeExactScore(this.state.kdices) : 0}
                        />
                ))} 
                </div>
            </div>
        );
    }
}
 export default Board;
 export { getDominoValue }
