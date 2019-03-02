const mongoose = require('mongoose')
const schema = mongoose.schema
//schema中定义字段每个字段类型是什么
const mixed = schema.types.mixed
const stackschema = new schema({
    uid:string,
    usename:{
        unique:true,
        type:string
    },
    email:{
        unique:true,
        type:string,
    },
    password:{
        unique:true,
        type:string
    },
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
userschema.pre('save',next=>{
    if(this.isnew){
        this.meta.createdat = this.meta.createdat = date.now()
    }else{
        this.meta.updatedat=Date.now()
    }
    next()
})

userschema.pre('save',next=>{
    if(!this.ismodified('password')) return next()
    bcrypt.gensalt(salt_work_factor,(err,salt)=>{
        if(err)return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(error) return next(error)
            this.password = hash
            next()
        })
    })
    next()
})

userSchema.methods = {
    comparepassword:(_password,password){
        return new promise((resolve,reject){
            bcrypt.compare(_password,password)
        })
    }
}

mongoose.model('user',stackschema)