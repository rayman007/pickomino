
export function getRandomDice() {
    return Math.floor(Math.random() * 6) + 1;
}

export function nextPlayer(lstate) {

    var dices = Array(8)
    for(let i = 0 ; i < 8 ; i++) {
        dices[i] = getRandomDice()
    }

    lstate.rdices = dices
    lstate.kdices = Array(0)
    lstate.selected = null
    lstate.kept = false

    lstate.current_player = (lstate.current_player + 1) % lstate.players_number

    return lstate

}

export function handleDominoClick(v) {

    if (!this.state.kept) {
        return
    }

    let lstate = this.state

    if (v === computeApproxScore(this.state.kdices, this.state.dominos)) {
        let pos = lstate.dominos.indexOf(v)
        lstate.dominos.splice(pos, 1)
        lstate.players[this.state.current_player].dominos.unshift(v)
        lstate = nextPlayer(lstate)
        this.setState(lstate)
    }    
    this.state.players.forEach((player, index) => {
        if (index !== this.state.current_player) {
            if ((v === player.dominos[0]) && (v === computeExactScore(this.state.kdices))) {
                lstate.players[index].dominos.splice(0, 1)
                lstate.players[this.state.current_player].dominos.unshift(v)
                lstate = nextPlayer(lstate)
                this.setState(lstate)
            }
        }
    })
}

export function handleAbandon() {

    let lstate = this.state
    let v = 0
    
    if (lstate.players[this.state.current_player].dominos.length !== 0) {
        v = lstate.players[this.state.current_player].dominos[0]
        lstate.players[this.state.current_player].dominos.splice(0, 1)
        lstate.dominos.push(v)  
        lstate.dominos.sort()  
    }

    if (v !== lstate.dominos[lstate.dominos.length - 1]) {
        lstate.dominos.pop()
    }

    lstate = nextPlayer(lstate)
    this.setState(lstate)


}

export function handleDiceClick(v) {

    if (!isDiceSelectable(v, this.state.kdices) )
        return 

    let lstate = this.state
    if (v === this.state.selected) {
        lstate.selected = null
    } else {
        lstate.selected = v
    }
    this.setState(lstate)
}

export function handleKeep() {
    if (this.state.selected == null) {
        return
    }

    for( let i = 0 ; i < this.state.kdices.length ; i++){ 
        if (this.state.selected === this.state.kdices[i]) {
            return
        }
    }

    var kdices = this.state.kdices.slice()
    var rdices = []


    for( let i = 0; i < this.state.rdices.length; i++){ 
                               
        if ( this.state.rdices[i] === this.state.selected) { 
            kdices.push(this.state.rdices[i])
        } else {
            rdices.push(this.state.rdices[i])
        }
    }

    let lstate = this.state
    lstate.rdices = rdices
    lstate.kdices = kdices
    lstate.selected = null
    lstate.kept = true
    this.setState(lstate)
}

export function handleRoll() {

    var kdices = this.state.kdices.slice()
    var rdices = []

    for( let i = 0; i < this.state.rdices.length; i++){ 
        rdices.push(getRandomDice())
    }
    this.setState({rdices: rdices, kdices: kdices, selected: null, kept: false})
}

export function computeTempScore(dices) {
    var total = 0
    for (let dice of dices) {
        total += (dice < 5 ? dice : 5)
    }
    return total
}

export function computeExactScore(dices) {
    var total = 0
    var valid = false
    for (let dice of dices) {
        total += (dice < 5 ? dice : 5)
        if (dice > 5)
            valid = true
    }
    if (valid)
        return total
    else
        return 0
}

export function computeApproxScore(dices, dominos) {
    var s = computeExactScore(dices)
    var r = 0
    for ( let i = 0 ; i < dominos.length ; i++ ) {
        if (dominos[i] <= s) {
            r = dominos[i]
        }
    }
    return r
}
export function isDiceSelectable(v, k) {
    for (let d of k) {
        if (d === v)
            return false
    }
    return true
}
