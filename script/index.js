const tablero = {
    "X":[],
    "O":[]
}
const dificultad = {
    "vs_player":true,
    "facil":false,
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
function select() {
    const opcion = document.getElementById("select").value
    for (let i in dificultad) {
        dificultad[i]=false
    }
    dificultad[opcion] = true
    Player.turn='X'
    newGame()
}
function Accion() {
    if (dificultad.vs_player) {
        vsPlayer()
    } else {
        vsCom()
    }
}

function vsPlayer() {
    document.addEventListener( "click",function (clk) {
        const jugada = clk.target.id;
        if (jugada!==undefined&&jugada[0]==='P'){
            const writeArea = document.getElementById(`${jugada}`).firstElementChild
            const jugadas = tablero.X.concat(tablero.O)
            if (!jugadas.includes(jugada)) {
                writeArea.textContent = Player.turn
                tablero[Player.turn].push(jugada)
                verify()
            }
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
    const jugadas = tablero.X.concat(tablero.O)
    if (jugadas.includes(`P${y}-${x}`)) {
        comFacil()
    }
    else{
        document.getElementById(`P${y}-${x}`).firstElementChild.textContent=Player.turn
        tablero[Player.turn].push(`P${y}-${x}`)
        verify()
    }
}
function comMedio() {
    const jugadas = tablero.X.concat(tablero.O)
    const jugadasProx = tableroVacio(jugadas)
    if (tablero[Player.turn].length===0) {
        let x=Math.floor(Math.random()*(3-0)+0)
        let y=Math.floor(Math.random()*(3-0)+0)
        if (jugadas.includes(`P${y}-${x}`)) {
            comMedio()
        }   else{
            document.getElementById(`P${y}-${x}`).firstElementChild.textContent=Player.turn
            tablero[Player.turn].push(`P${y}-${x}`)
            verify()
        }
    }   else{
        console.log(jugadasProx, 'jugadas pendientes');
        // verificar jugadas del contrincante
        // si tiene 2 en fila bolquear
        // sino tratar de poner 3 en fila
        let comJ = block(jugadasProx,0)
        document.getElementById(`${comJ}`).firstElementChild.textContent=Player.turn
        tablero[Player.turn].push(`${comJ}`)
        verify()
    }
}
function comDificil(writeArea, jugada) {

}
function verify() {
    if (winner()) {
        ++Pts[Player.turn]
        document.getElementById(`${Player.turn}`).textContent=Pts[Player.turn]
        alert(` Ganador ${Player.turn} `)
        tableroDisable()
    }else if (empate()) {
        ++Pts.E
        document.getElementById(`${"E"}`).textContent=Pts.E
        alert(` Empate `)
        tableroDisable()
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
function tableroDisable() {
    for (let i = 0; i < 3; i++) {        
        for (let j = 0; j < 3; j++) {
            document.getElementById(`P${i}-${j}`).setAttribute("disabled","disabled")
        }
    }
}
function tableroVacio(tablero) { 
    const tableroV = []
    for (let i = 0; i < 3; i++) {        
        for (let j = 0; j < 3; j++) {
            if (!tablero.includes(`P${i}-${j}`)){
                tableroV.push(`P${i}-${j}`)
            }
        }
    }
    return tableroV
}
function block(tVacio,n) {
    console.log('ejecuto????');
    let aux = []
    let aux2 = []
    let play = tablero[Player.player].sort()
    let tab = tablero[Player.com].concat(tablero[Player.player]).sort()
    switch (n) {
        case 0:
        case 1:
        case 2: 
        console.log(n, '= n');
            for (let i = 0; i < 3; i++) {
                aux.push(`P${n}-${i}`)
            }
            for (let i = 0; i < aux.length; i++) {
                if (!play.includes(aux[i])&&tab.includes(aux[i])) {
                    aux2.push(false)//aux[i]
                }
                if (!play.includes(aux[i])&&!tab.includes(aux[i])) {
                    aux2.push(aux[i])//aux[i]
                }
            }
            aux2 = aux2.sort()
            console.log(aux2);
            break;
        case 3:
        case 4:
        case 5: 
        console.log(n, '= n');
            for (let i = 0; i < 3; i++) {
                aux.push(`P${i}-${n-3}`)
            }
            for (let i = 0; i < aux.length; i++) {
                if (!play.includes(aux[i])&&tab.includes(aux[i])) {
                    aux2.push(false)//aux[i]
                }
                if (!play.includes(aux[i])&&!tab.includes(aux[i])) {
                    aux2.push(aux[i])//aux[i]
                }
            }
            aux2 = aux2.sort()
            console.log(aux2);
            break;
        case 6:
        console.log(n, '= n');
            let j = 2
            for (let i = 0; i < 3; i++) {
                if (!play.includes(`P${j}-${i}`)) {
                    aux2.push(`P${j}-${i}`)
                }
                --j
            }
            break;
        case 7:
        console.log(n, '= n');
            //let j = 2
            for (let i = 0; i < 3; i++) {
                if (!play.includes(`P${j}-${i}`)) {
                    aux2.push(`P${j}-${i}`)
                }
                --j
            }
            break;
        default:
            //tratar de poner 3 en fila
            
            break;
    }
    console.log(n, 'no sw');
    if ((aux2.length>1&&tVacio.length>1)||aux2.includes(false)) {
        console.log('ejecuta el if???');
        return block(tVacio,n+1)       
    }
    return aux2[0]
}
function newGame() {
    const tabla = []
    for (let i = 0; i < 3; i++) {        
        for (let j = 0; j < 3; j++) {
            tabla.push(document.getElementById(`P${i}-${j}`))
        }
    }
    tabla.forEach(e=>{
        e.removeAttribute("disabled")
        e.firstElementChild.textContent = ''
        tablero.O.length=0
        tablero.X.length=0
    })
    Accion()
}