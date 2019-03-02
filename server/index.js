const Koa = require('koa')
const {resolve } = require('path')
const mongoose = require('mongoose')
const router = require('./routes/stack')
const R = require('ramda')
const MISDDLEWEARES = ['router']
const {connect,initschemas} =require('./database/init')


//加载中间件数组
const useMiddlewares = (app) =>{
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            name => resolve(__dirname,`./routes/${name}`)
        )
    )(MISDDLEWEARES)
}

;(async ()=>{
    //连接数据库，初始化所有schemas
    await connect()
    //initschemas()

    // const stack = mongoose.model('stack')
    // const movies = await stack.find({})
    // console.log(movies)
    const app = new Koa()
    await useMiddlewares(app)
    app.listen(4455)
})() 

// app.use(router.routes())
// app.use(router.allowedmethods())

 


// const koa =require('koa')
// const app = new Koa()
// app.use(async(ctx,next)=>{
//     ctx.body = 'xxx'
//     next()
// })

// app.listen(3000)

// var express = require('express')
// var app = express()
// app.get('/',function(req,res){
//     res.send('hw')
// })
// var server = app.listen(999)