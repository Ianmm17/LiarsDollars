// Get the element
let numberOfPlayers = 1;
let playerCard = ""

function addPlayer() {
    numberOfPlayers += 1
    playerCard = `player-card${numberOfPlayers}`
    console.log("SORTA ADDED PLAYER")
    let elementPlayerClasses = document.getElementById("player-classes")
    elementPlayerClasses.insertAdjacentHTML("beforeend", "" +
        `<div class=${playerCard} id=${playerCard}>` +
                `<input id="player-name" class="player-name" type='text' name='player-name' maxlength=12 placeholder="Enter Player Name" color=\"grey\"/>
                <input class="player-total" type='number' name='player-total' maxlength=12/>
                <button class="winner" type="button" name="winner">W</button>
                <button class="loser" type="button" name="loser">L</button>
        </div>`)
    //elementPlayerClasses.append(clone)
    console.log(playerCard)
}

