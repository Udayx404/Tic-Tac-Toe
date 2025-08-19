const cells = document.querySelectorAll(".cell")
const statustext = document.querySelector("#status-text")
const restart = document.querySelector("#restart")
const winconditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let options = ["","","","","","","","",""]
let currplayer = "X"
let running = false
initializegame()

function initializegame(){
    cells.forEach(cell=>cell.addEventListener("click", cellClicked))
    restart.addEventListener("click", restartGame)
    statustext.textContent = `${currplayer}'s turn`
    running = true
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex")

    if(options[cellIndex]!=""||!running){
        return;
    }
    updateCell(this, cellIndex)
    checkWinner()
}

function updateCell(cell, index){
    options[index] = currplayer
    cell.textContent = currplayer
}

function changePlayer(){
    currplayer = (currplayer=="X")?"O":"X"
    statustext.textContent = `${currplayer}'s turn`
}

function checkWinner(){
    let roundWon = false

    for (let i=0;i<winconditions.length;i++){
        const condition = winconditions[i]
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]

        if (cellA==""||cellB==""||cellC==""){
            continue
        }
        if (cellA==cellB && cellB==cellC){
            roundWon = true
            break
        }
    }

    if (roundWon){
        statustext.textContent = `${currplayer} wins`
        running = false
    }
    else if (!options.includes("")){
        statustext.textContent = `Draw!`
        running = false
    }
    else{
        changePlayer()
    }
}

function restartGame(){
    currplayer = "X"
    options = ["","","","","","","","",""]
    statustext.textContent = `${currplayer}'s turn`
    cells.forEach(cell => cell.textContent="")
    running = true
}