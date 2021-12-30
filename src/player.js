import React from 'react';
import Domino from './domino.js'
import { getDominoValue } from "./board.js"

class Player extends React.Component {
    render() {

        let player_score = 0
        for (const d of this.props.dominos) {
            player_score += getDominoValue(d)
        }

        return (
            <div class={'player ' + (this.props.current_player ? "player_active " : "")}>
                
                {this.props.name} - {player_score}
                {this.props.dominos.map((domino, index) => (
                <Domino 
                    value={domino}
                    handleDominoClick={this.props.handleDominoClick}
                    current_score={((this.props.current_player) || (index !== 0)) ? 0: this.props.current_score}
                    />
                ))}
            </div>
        );
    }
}

export default Player;
