import {
getGameState,
setGameState,
addGameHistory
} from "./firebase-config.js"


const numColors = {

0:["red","violet"],
1:["green"],
2:["red"],
3:["green"],
4:["red"],
5:["red","violet"],
6:["green"],
7:["red"],
8:["green"],
9:["red"]

}


export async function runDraw(){

const state = await getGameState()

let num

if(state.forcedNumber!=null){

num = state.forcedNumber

}else{

num = Math.floor(Math.random()*10)

}

const cols = numColors[num]

const color = cols[Math.floor(Math.random()*cols.length)]

const size = num>=5?"Big":"Small"

await addGameHistory({

period:state.period,
number:num,
color,
size,
time:Date.now()

})


const nextEnd = Date.now()+30000

await setGameState({

period:state.period+1,
endTime:nextEnd,
forcedNumber:null

})

}
