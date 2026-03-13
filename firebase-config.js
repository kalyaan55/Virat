import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"

import {
getDatabase,
ref,
set,
update,
get,
push,
onValue
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"


const firebaseConfig = {

apiKey: "YOUR_KEY",
authDomain: "YOUR_DOMAIN",
databaseURL: "YOUR_DB_URL",
projectId: "YOUR_PROJECT"

}

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)



export function getSession(){

return localStorage.getItem("uid")

}

export function clearSession(){

localStorage.removeItem("uid")

}



export async function getUser(uid){

const snap = await get(ref(db,"users/"+uid))

return snap.val()

}



export async function updateUser(uid,data){

await update(ref(db,"users/"+uid),data)

}



export async function addTransaction(uid,data){

await push(ref(db,"transactions/"+uid),data)

}



export async function getGameState(){

const snap = await get(ref(db,"gameState"))

if(!snap.exists()){

const def={

period:1,
endTime:Date.now()+30000,
forcedNumber:null

}

await set(ref(db,"gameState"),def)

return def

}

return snap.val()

}



export async function setGameState(data){

await update(ref(db,"gameState"),data)

}



export async function addGameHistory(data){

await push(ref(db,"gameHistory"),data)

}



export async function getGameHistory(){

const snap = await get(ref(db,"gameHistory"))

if(!snap.exists()) return []

return Object.values(snap.val()).reverse()

}
