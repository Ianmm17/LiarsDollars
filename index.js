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
        addTableRow(name, playerBalanceNumBoxName, numberOfPlayers -1, false)
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
            let undoPlayerBalance = Number(document.getElementById(playerBalanceNumBoxName).value) + Number(numberOfPlayers - 1)
            document.getElementById(playerBalanceNumBoxName).value = undoPlayerBalance
            for (let i = 0; i < playerArr.length; i++) {
                if (playerBalanceNumBoxName !== playerArr[i]) {
                    let needsRefundPlayer = Number(document.getElementById(`${playerArr[i]}`).value)
                    document.getElementById(`${playerArr[i]}`).value = needsRefundPlayer - 1
                }
            }
            document.getElementById("table-data").remove()
        }

    }
}

function submit() {
    let headers = ['Player', 'Amount Won/Lost', 'Won/Lost']
    let cell = []
    const table = document.getElementById('overall-table');
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            if (table.rows[i].cells[j].innerText === 'X') continue
            let cellData = table.rows[i].cells[j].innerText
            cell.push(cellData)

        }
    }
    download_csv_file(cell)
}

//create a user-defined function to download CSV file
function download_csv_file(cellArr) {
    console.log(cellArr, 'array being passed in')

    //define the heading for each row of the data
   // let csvData = [['Player', 'Amount Won/Lost', 'Won/Lost']]
    let csvData = []
    let newCsvData = [];
   for (let i = 0; i < cellArr.length; i++) {
       newCsvData.push(cellArr[i])
       console.log(newCsvData[i],newCsvData.length, 'this is the lenght')
       if (newCsvData.length === 3) {
           console.log(newCsvData)
           if (csvData[0] === undefined) {
            csvData[0] = newCsvData
            newCsvData = []

           } else if (csvData[1] === undefined) {
            csvData[1] = newCsvData
            newCsvData = []

           } else {
            csvData[2] = newCsvData
            newCsvData = []

           }
           
       }
   }
   console.log(csvData, 'this is data')
  // console.log(csvData)
/*
    //display the created CSV data on the web browser
    document.write(csvHeaders);


    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvHeaders);
    hiddenElement.target = '_blank';

    //provide the name for the CSV file to be downloaded
    hiddenElement.download = 'Liars Dollars' + new Date() + '.csv';
    hiddenElement.click();
    */
}