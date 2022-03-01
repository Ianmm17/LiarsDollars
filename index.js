// Get the element
class Player {
    constructor(name, startingBalance, currentBalance) {
        this.name = name
        this.total = total
        this.startingBalance = startingBalance
        this.currentBalance = currentBalance
    }
}

//document.querySelectorAll('.player-class .player-name') maybe use?
let numberOfPlayers = 1;
let playerArr = ['player-total']


function addPlayer() {
    numberOfPlayers += 1
    let playerCard = `player-card${numberOfPlayers}`
    let playerName = `player-name${numberOfPlayers}`
    let playerTotal = `player-total${numberOfPlayers}`
    playerArr.push(playerTotal)
    addPlayerCard(playerName, playerTotal, playerCard)
}

function resetGame() {
    let trueOrFalse = confirm('All data will be lost for game, are you sure you want to reset game?')
    if (trueOrFalse) {
        window.location.reload()
    }
}

function winner(playerName, playerBalanceNumBoxName) {
    let name = document.getElementById(`${playerName}`).value
    let balance = document.getElementById(playerBalanceNumBoxName).value

    if (name === "" || balance === "") {
        alert("Please enter a name and player balance")
    } else if (playerArr.length < 2) {
        document.getElementsByClassName('winner').disable = true
    } else {
        document.getElementById(playerBalanceNumBoxName).value = Number(balance) + (numberOfPlayers - 1)
        addTableRow(name, playerBalanceNumBoxName,numberOfPlayers -1, true)
        for (let i = 0; i < playerArr.length; i++) {
            if (playerBalanceNumBoxName !== playerArr[i]) {
                let losingPlayer = document.getElementById(`${playerArr[i]}`).value
                document.getElementById(`${playerArr[i]}`).value = losingPlayer - 1
            }
        }
    }

}

function loser(playerName, playerBalanceNumBoxName) {
    let name = document.getElementById(playerName).value
    let balance = document.getElementById(playerBalanceNumBoxName).value

    if (name === "" || balance === "") {
        alert("Please enter a name and player balance")
    } else if (playerArr.length < 2) {
        document.getElementsByClassName('loser').disable = true
    } else {
        document.getElementById(playerBalanceNumBoxName).value = Number(balance) - (numberOfPlayers - 1)
        addTableRow(name, numberOfPlayers -1, false)
        for (let i = 0; i < playerArr.length; i++) {
            if (playerBalanceNumBoxName !== playerArr[i]) {
                let winingPlayer = Number(document.getElementById(`${playerArr[i]}`).value)
                document.getElementById(`${playerArr[i]}`).value = winingPlayer + 1
            }
        }
    }
}

function addTableRow(name, playerBalanceNumBoxName, moneyEarnedOrLoss, winOrLoss) {
    if (winOrLoss) {
        document.getElementById("table-headers").insertAdjacentHTML("afterend",
            `<tr id="table-data">
            <td>${name}</td>
            <td>+$${moneyEarnedOrLoss}.00</td>
            <td>Won</td>
            <td id="remove-record"><button class="remove-record" onclick="removeData('${playerBalanceNumBoxName}', ${winOrLoss})">X</button></td>
        </tr>`
        )
    } else {
        document.getElementById("table-headers").insertAdjacentHTML("afterend",
            `<tr id="table-data">
            <td>${name}</td>
            <td>-$${moneyEarnedOrLoss}.00</td>
            <td>Lost</td>
            <td id="remove-record"><button class="remove-record" onclick="removeData('${playerBalanceNumBoxName}', ${winOrLoss})">X</button></td>
        </tr>`
        )
    }

}

function addPlayerCard(playerName, playerTotal, playerCard) {
    let elementPlayerClasses = document.getElementById("player-classes")
    elementPlayerClasses.insertAdjacentHTML("beforeend",
        `<div class=player-card id=${playerCard}>` +
        `<input id="${playerName}" class="player-name" type='text' name='player-name' maxlength=12 placeholder="Enter Player Name" color=\"grey\"/>
                <input id="${playerTotal}" class="player-total" type='number' name='player-total' maxlength=12/>
                <button class="winner" type="button" name="winner" onclick="winner('${playerName}', '${playerTotal}')">W</button>
                <button class="loser" type="button" name="loser" onclick="loser('${playerName}', '${playerTotal}')">L</button>
        </div>`)
}

function removeData(playerBalanceNumBoxName, winOrLoss) {
    //console.log(typeof playerNameNumBox, playerNameNumBox, document.getElementById(playerNameNumBox).value)
    //console.log(playerName, playerName.value, typeof playerName, moneyEarnedOrLost, typeof moneyEarnedOrLost)
    if (confirm('Data will be lost for round, are you sure you want to delete round?')) {
        if (winOrLoss) {
            let undoPlayerBalance = Number(document.getElementById(playerBalanceNumBoxName).value - (numberOfPlayers - 1))
            document.getElementById(playerBalanceNumBoxName).value = undoPlayerBalance
            for (let i = 0; i < playerArr.length; i++) {
                if (playerBalanceNumBoxName !== playerArr[i]) {
                    let needsRefundPlayer = Number(document.getElementById(`${playerArr[i]}`).value)
                    document.getElementById(`${playerArr[i]}`).value = needsRefundPlayer + 1
                }
            }
            document.getElementById("table-data").remove()
        } else {
            let undoPlayerBalance = Number(document.getElementById(playerBalanceNumBoxName).value + (numberOfPlayers - 1))
            document.getElementById(playerBalanceNumBoxName).value = undoPlayerBalance
            for (let i = 0; i < playerArr.length; i++) {
                if (playerBalanceNumBoxName !== playerArr[i]) {
                    let needsRefundPlayer = Number(document.getElementById(`${playerArr[i]}`).value)
                    document.getElementById(`${playerArr[i]}`).value = needsRefundPlayer + 1
                }
            }
        }

    }
}

