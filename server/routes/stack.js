const Router = require('koa-router')
const mongoose = require('mongoose')
const Stack = mongoose.model('Stack')
const router = new Router()
const getStack = require('../webdata')
const checkPassword = require('../api/admin')
//和stack相关的路由文件都，用户只有用户的股票只有股票的
//不同请求方法区分
// @controller('/api/v0/stack')
// export class stackController{
//    @get('/')
//    @login 
//    @admin(['developer'])
//    async getStack(ctx,next){
//       const stack = mongoose.model('Stack')
//       const stacks = await Stack.find({}).sort({
//          'meta.createdAt':-1
//         })
//         ctx.body={
//          stack
//         }
//    } 
//    // @post
//    // @require({body:['stackcode','stackname']})
// }
   
router.get('./stack',async (ctx,next)=>{
   const {code} = ctx.query
   const stackinfo = await getStack(code)
   const stack = await Stack.find({}).sort({
    'meta.createdAt':-1
   })
   ctx.body={
    stack
   }
})

router.get('./user',async (ctx,next)=>{
   const {email,password} = ctx.request.body
   const matchData= await checkPassword(email,password)
   if(!matchData.user){
      return (ctx.body={
         success:false,
         err:'用户不存在'
      })
   }
   if(matchData.match){
      return(ctx.body={
         success:true
      })
   }

   return (ctx.body={
      success:false,
      err:'密码不正确'
   })
})

module.exports = router