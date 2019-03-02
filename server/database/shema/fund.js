const mongoose = require('mongoose')
const schema = mongoose.schema
//schema中定义字段每个字段类型是什么
const mixed = schema.types.mixed
const stackschema = new schema({
    uid:string,
    initfund:number,
    curfund:number,
    meta:{
        createdat:{
            type:Date,
            default:Date.now()
        },
        updatedat:{
            type:Date,
            default:Date.now()
        },
    }
})
stackschema.pre('save',next=>{
    if(this.isnew){
        this.meta.createdat = this.meta.createdat = date.now()
    }else{
        this.meta.updatedat=Date.now()
    }
    next()
})

mongoose.model('stack',stackschema)