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
const Jugadas = {
    "0":['P0-0','P0-1','P0-2'],
    "1":['P0-0','P0-2','P0-1'],
    "2":['P0-1','P0-2','P0-0'],
    "3":['P1-0','P1-1','P1-2'],
    "4":['P1-0','P1-2','P1-1'],
    "5":['P1-1','P1-2','P1-0'],
    "6":['P2-0','P2-1','P2-2'],
    "7":['P2-0','P2-2','P2-1'],
    "8":['P2-1','P2-2','P2-0'],
    "9":['P0-0','P1-0','P2-0'],
    "10":['P0-0','P2-0','P1-0'],
    "11":['P1-0','P2-0','P0-0'],
    "12":['P0-1','P1-1','P2-1'],
    "13":['P0-1','P2-1','P1-1'],
    "14":['P1-1','P2-1','P0-1'],
    "15":['P0-2','P1-2','P2-2'],
    "16":['P0-2','P2-2','P1-2'],
    "17":['P1-2','P2-2','P0-2'],
    "18":['P0-0','P1-1','P2-2'],
    "19":['P0-0','P2-2','P1-1'],
    "20":['P1-1','P2-2','P0-0'],
    "21":['P2-0','P1-1','P0-2'],
    "22":['P2-0','P0-2','P1-1'],
    "23":['P1-1','P0-2','P2-0']
}
function select() {
    const opcion = document.getElementById("select").value
    const rBttn1 = document.getElementById("Radio1")
    const rBttn2 = document.getElementById("Radio2")
    //.removeAttribute("disabled")
    Pts.E=0
    Pts.O=0
    Pts.X=0
    for (let i in dificultad) {
        dificultad[i]=false
    }
    dificultad[opcion] = true
    Player.turn='X'
    newGame()
    if(opcion!=="vs_player"){
        rBttn1.removeAttribute("disabled")
        rBttn2.removeAttribute("disabled")
    }
    else{
        rBttn1.setAttribute("disabled","disabled")
        rBttn2.setAttribute("disabled","disabled")
    }
}
function opcionS(id) {
    const rBttn1 = document.getElementById("Radio1")
    const rBttn2 = document.getElementById("Radio2")
    Pts.E=0
    Pts.O=0
    Pts.X=0
    if (id==="Radio1") {
        rBttn1.checked = true
        rBttn2.checked = false
        Player.player=rBttn1.value
        Player.com=rBttn2.value
    }else{
        rBttn2.checked = true
        rBttn1.checked = false
        Player.player=rBttn2.value
        Player.com=rBttn1.value
    }
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
                writeArea.classList.add(`${Player.turn==="X"?"rojosX":"verdesO"}`)
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
        let writeArea = document.getElementById(`P${y}-${x}`).firstElementChild
        writeArea.textContent=Player.turn
        writeArea.classList.add(`${Player.turn==="X"?"rojosX":"verdesO"}`)
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
            let writeArea = document.getElementById(`P${y}-${x}`).firstElementChild
            writeArea.textContent=Player.turn
            writeArea.classList.add(`${Player.turn==="X"?"rojosX":"verdesO"}`)
            tablero[Player.turn].push(`P${y}-${x}`)
            verify()
        }
    }   else{
        // verificar jugadas del contrincante
        // si tiene 2 en fila bolquear
        // sino tratar de poner 3 en fila

        const comJ = block(jugadasProx,0)
        let writeArea = document.getElementById(`${comJ}`).firstElementChild
        writeArea.textContent=Player.turn
        writeArea.classList.add(`${Player.turn==="X"?"rojosX":"verdesO"}`)
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
            if (!dificultad.vs_player) {
                vsCom()
            }
        } else {
            Player.turn="X"
            if (!dificultad.vs_player) {
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
        for (let j = 0; j < 3; j++) {
            if (Win.includes(`P${i}-${j}`)) {
                filWin.push(true)
            }else{
                filWin.push(false)
            }
        }
        if (!filWin.includes(false)&&filWin.length===3) {
            return true
        }
    }
    return winCol(Win)
}
function winCol(Win) {
    for (let i = 0; i < 3; i++) {
        let colWin = []
        for (let j = 0; j < 3; j++) {
            if (Win.includes(`P${j}-${i}`)) {
                colWin.push(true)
            }else{
                colWin.push(false)
            }
        }
        if (!colWin.includes(false)&&colWin.length===3) {
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
    let aux = []
    let aux2 = []
    const play = tablero[Player.player].sort()
    const tab = tablero[Player.com].concat(tablero[Player.player]).sort()
    const x = tablero[Player.player].length===1?1:comToWin()
    switch (n) {
        case 0:
        case 1:
        case 2: 
            if (typeof(x)==='number') {
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
            }else{
                aux2.push(x)
            }
            break;
        case 3:
        case 4:
        case 5: 
            if (typeof(x)==='number'){ 
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
            }else{
                aux2.push(x)
            }
            break;
        case 6:
            if (typeof(x)==='number'){
                let j = 2
                for (let i = 0; i < 3; i++) {
                    if ((!play.includes(`P${j}-${i}`))&&(!tab.includes(`P${j}-${i}`))) {
                        aux2.push(`P${j}-${i}`)
                    }
                    --j
                }
            }else{
                aux2.push(x)
            }
            break;
        case 7:
            if (typeof(x)==='number'){
                for (let i = 0; i < 3; i++) {
                    if ((!play.includes(`P${i}-${i}`))&&(!tab.includes(`P${i}-${i}`))) {
                        aux2.push(`P${i}-${i}`)
                    }
                }
            }else{
                aux2.push(x)
            }
            break;
        default:
            if (tVacio.includes('P1-1')) {
                aux2.push('P1-1')
            }else{
                typeof(x)==='number'?aux2.push(tVacio[x]):aux2.push(x)
            }
            break;
    }
    if ((aux2.length>1&&tVacio.length>1)||aux2.includes(false)||aux2.length===0) {
        return block(tVacio,n+1)       
    }else{
        return aux2[0]
    }
}
function comToWin() {
    const tabCom = tablero[Player.turn]
    const tableroV =tableroVacio(tablero.O.concat(tablero.X))
    let num = Math.floor(Math.random()*(tableroV.length-0)+0)
    for (let i = 0; i < 24; i++) {
        const j1 = Jugadas[i][0]
        const j2 = Jugadas[i][1]
        const j3 = Jugadas[i][2]
        if ((tabCom.includes(j1))&&(tabCom.includes(j2))&&(tableroV.includes(j3))){
            return j3
        }
    }
    return num
}
function newGame() {
    const tabla = []
    const rojos = []
    const verdes = []
    
    for (let i = 0; i < 3; i++) {        
        for (let j = 0; j < 3; j++) {
            let bttn = document.getElementById(`P${i}-${j}`)
            tabla.push(bttn)
            rojos.push(bttn.getElementsByClassName("rojosX"))
            verdes.push(bttn.getElementsByClassName("verdesO"))
        }
    }
    for (let i = 0; i < rojos.length; i++) {
        if (rojos[i].length!==0) {
            rojos[i][0].textContent = ''
            rojos[i][0].classList.remove("rojosX");
        }
    }
    for (let i = 0; i < verdes.length; i++) {
        if (verdes[i].length!==0) {
            verdes[i][0].textContent = ''
            verdes[i][0].classList.remove("verdesO");
        }
    }
    tabla.forEach(e=>{
        e.removeAttribute("disabled")
    })
    tablero.O=[]
    tablero.X=[]
    Player.turn='X'
    Accion()
}