//http://web.juhe.cn:8080/finance/stock/hs?gid=sh601009&key
//支持async await
//点击购买时得到的函数
const rp = require('request-promise-native')
const mongoose = require('mongoose')
const querystring = require('querystring')
//const stack = mongoose.model('stack')
async function fetchStack(item){
    const url = `http://qt.gtimg.cn/q=${item}`
    //拿到数据，然后返回，rp封装好的请求数据
    const res = await rp(url)
    return res
}

;(async ()=>{
   let stackdata = await fetchStack('sh600519')
try{
    console.log(typeof(stackdata))
    let data = stackdata.split(',')
    console.log(data)
}catch(err){
    console.log(err)
}
})()
//输出函数
// ;(async (data)=>{
//     let stackname = await stackname.findOne({
//         stackname:data.name
//     })
//     if(!stackname){
//         stackname = new stack(item)
//         await stack.save()
//     }
// })()