// Get the element
let numberOfPlayers = 1;
let playerName = "player-name"


function addPlayer() {
    let playerCard = ""
    numberOfPlayers += 1
    playerCard = `player-card${numberOfPlayers}`
    playerName = `player-name${numberOfPlayers}`
    console.log("SORTA ADDED PLAYER")
    let elementPlayerClasses = document.getElementById("player-classes")
    elementPlayerClasses.insertAdjacentHTML("beforeend",
        `<div class=player-card id=${playerCard}>` +
                `<input id="${playerName}" class="player-name" type='text' name='player-name' maxlength=12 placeholder="Enter Player Name" color=\"grey\"/>
                <input class="player-total" type='number' name='player-total' maxlength=12/>
                <button class="winner" type="button" name="winner" onclick="winner(playerName)">W</button>
                <button class="loser" type="button" name="loser">L</button>
        </div>`)
    //elementPlayerClasses.append(clone)
    console.log(playerCard, playerName)
}

function resetGame() {
    //window.location.reload();
    numberOfPlayers = 1
    document.getElementById("player-classes").remove()
    document.getElementById("add-or-reset").insertAdjacentHTML("afterend",
        `<div class="player-classes" id="player-classes">
            <div class="player-card" id="player-card">
            <input id="player-name" class="player-name" type='text' name='player-name' maxlength=12 placeholder="Enter Player Name" color="grey"/>
            <input class="player-total" type='number' name='player-total' maxlength=12/>
            <button class="winner" type="button" name="winner" onclick="winner(document.getElementById('player-name').value)">W</button>
            <button class="loser" type="button" name="loser">L</button>
            </div>
        </div>`
    )
    document.getElementById("overall-table").remove()
    document.getElementById("player-record").insertAdjacentHTML("beforeend",
        `<table id="overall-table">
            <tr id="table-headers">
                <th>Player</th>
                <th>Win/Loss</th>
                <th>Amount Won/Loss</th>
            </tr>
            <tr id="table-data">
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
                <td id="remove-record"><button class="remove-record" onClick="removeData()">X</button>
                </td>
            </tr>
        </table>`
    )
}

function winner(playerName) {
    let name = document.getElementById(`${playerName}`).value
    if (name === "") {
        alert("Please enter a name")
    } else {
        document.getElementById("table-headers").insertAdjacentHTML("afterend",
            `<tr id="table-data">
            <td>${name}</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td id="remove-record"><button class="remove-record" onclick="removeData()">X</button></td>
        </tr>`
        )
    }

    console.log(name)

}

function removeData() {
    document.getElementById("table-data").remove()
}

