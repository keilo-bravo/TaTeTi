const tablero = {
    "X":[],
    "O":[]
}
const dificultad = {
    "vs_player":false,
    "facil":true,
    "medio":false,
    "dificil":false
}
const Player = {
    "turn":"X",
    "player":"X",
    "com": "O"
}
const Pts = {
    "X":0,
    "E":0,
    "O":0
}
function Accion() {
    if (dificultad.vs_player) {
        vsPlayer()
    } else {
        vsCom()
    }
}

function vsPlayer() {
    document.addEventListener( "click",function (ckl) {
        const jugada = ckl.target.id;
        const boton = document.getElementById(`${jugada}`)
        const writeArea = boton.firstElementChild
        if (writeArea.textContent === "X" && Player.turn === "O") {
            writeArea.textContent = "X"
        } else if (writeArea.textContent === "O" && Player.turn === "X") {
    
            writeArea.textContent = "O"
        } else {
            writeArea.textContent = Player.turn
            tablero[Player.turn].push(jugada)
            verify()
        }
    })
}
function vsCom() {
    if (Player.turn===Player.player) {
        vsPlayer()
    }
    else{
        if (dificultad.facil) {
            comFacil()
        }
        if (dificultad.medio) {
            comMedio()
        }
        if (dificultad.dificil) {
            comDificil()
        }
    }
}
function comFacil() {
    let x=Math.floor(Math.random()*(3-0)+0)
    let y=Math.floor(Math.random()*(3-0)+0)
    let tab = tablero.X.concat(tablero.O)
    if (tab.includes(`P${y}-${x}`)) {
        comFacil()
    }
    else{
        document.getElementById(`P${y}-${x}`).firstElementChild.textContent=Player.turn
        tablero[Player.turn].push(`P${y}-${x}`)
        verify()
    }
}
function comMedio(writeArea, jugada) {

}
function comDificil(writeArea, jugada) {

}
function verify() {
    if (winner()) {
        ++Pts[Player.turn]
        document.getElementById(`${Player.turn}`).textContent=Pts[Player.turn]
        alert(` Ganador ${Player.turn} `)
    }else if (empate()) {
        ++Pts.E
        document.getElementById(`${"E"}`).textContent=Pts.E
        alert(` Empate `)
    }else {
        if (Player.turn==="X") {
            Player.turn="O"
            if (!dificultad.vs_player&&Player.com===Player.turn) {
                vsCom()
            }
        } else {
            Player.turn="X"
            if (!dificultad.vs_player&&Player.com===Player.turn) {
                vsCom()
            }
        }
    }
}
function winner() {
    let Win = tablero[Player.turn]
    return winFila(Win)
}
function empate() {
    if(!winner()){
        return tablero.X.length+tablero.O.length===9 ? true : false
    }
    return false
}
function winFila(Win) {
    for (let i = 0; i < 3; i++) {
        let filWin = []
        for (let j = 0; j < Win.length; j++) {
            if (parseInt(Win[j][1])===i) {
                filWin.push(Win[j][1])
            }
        }
        if (filWin.length===3) {
            return true
        }
    }
    return winCol(Win)
}
function winCol(Win) {
    for (let i = 0; i < 3; i++) {
        let colWin = []
        for (let j = 0; j < Win.length; j++) {
            if (parseInt(Win[j][3])===i) {
                colWin.push(Win[j][3])
            }
        }
        if (colWin.length===3) {
            return true
        }
    }
    return winCruz(Win)
}
function winCruz(Win) {
    if ((Win.includes("P0-0"))&&(Win.includes("P1-1"))&&(Win.includes("P2-2"))) {
        return true
    } if ((Win.includes("P2-0"))&&(Win.includes("P1-1"))&&(Win.includes("P0-2"))) {
        return true
    }
    return false
}