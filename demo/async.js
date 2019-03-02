import { resolve } from "q";

;(async ()=>{
    console.log(111);
    await doasync('www',1000)
})()
const doasync = (sth,time)=>new Promise(resolve=>{
    setTimeout(()=>{
        console.log(sth);
        resolve()
    },time)
})