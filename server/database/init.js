const mongoose = require('mongoose')
const glob = require('glob')
const db = 'mongodb://localhost/stack'
const {resolve} = require('path')
mongoose.Promise = global.Promise

//输出资金表初始化时使用，第二个表是持股表，第三个表是历史成交，第四个表当日委托表，
exports.initschemas = ()=>{
    glob.sync(resolve(__dirname,'./shcema','**/*.js')).foreach(require)
}
exports.connect=()=>{
    let maxconnecttime = 0;
    return new Promise((resolve,reject)=>{
        //env 生产环境
        if(process.env.NODE_ENV !== 'production'){
            mongoose.set('debug',true)
        }
        //连接数据库
        mongoose.connect(db)
        //断开重连
        mongoose.connection.on('disconnected',()=>{
            //断开连接次数计数
            maxconnecttime++
            if(maxconnecttime<5){
                mongoose.connect(db)
            }else{
                throw new Error('database die')
            }
            mongoose.connect(db)
        })
        mongoose.connection.on('error',(err)=>{
            reject()
            console.log(err)
        })
        mongoose.connection.once('open',()=>{
            //example
           const Dog = mongoose.model('Dog',{name:String})
           const doga = new Dog({name:'a'})
            doga.save().then(()=>{
                console.log('wang')
            })
           //连接成功的状态传递出去
            resolve()
            console.log('mongodb connectd successfully')
        })
    })
    
}