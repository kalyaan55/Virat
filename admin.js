import {
getGameState,
setGameState
} from "./firebase-config.js"


window.forceResult = async function(){

const num = parseInt(document.getElementById("forceNum").value)

await setGameState({

forcedNumber:num

})

alert("Result forced")

}


window.startRound = async function(){

const state = await getGameState()

await setGameState({

period:state.period+1,
endTime:Date.now()+30000,
forcedNumber:null

})

alert("New round started")

}
