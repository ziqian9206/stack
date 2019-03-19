import axios from 'axios'
import { message } from 'antd'

// let http = {
//     post:'',
//     get:''
// }

// http.post = (url,data)=>{
//     const uData = Object.assign({},data,{uid:sessionStorage['uid']})
//     return new Promise((resolve,reject)=>{
//         axios({
//             method:"POST",
//             url:url,
//             data:uData,
//         }).then((res)=>{
//             const response = res.data
//             if(response.error === 0){
//                // message.success(response.msg)
//                 resolve(response)
//             }else{
//                 message.error(response.msg)
//             }
//         })
//     })
// }

// http.get = (url,data)=>{
//     return new Promise((resolve,reject)=>{
//         const uData = 
//         axios({
//             method:"GET",
//             url:url,
//             params:data,
//         }).then((res)=>{
//             const response = res.data
//             if(response.error === 0){
//                // message.success(response.msg)
//                 resolve(response)
//             }else{
//                 message.error(response.msg)
//             }
//         }).catch((err)=>{
//             console.log('err',err)
//         })
//     })
// }
// export default http



const instance = axios.create({
    baseURL: 'http://118.24.8.141:7001',
    timeout: 30000
  });


  instance.interceptors.response.use(
      response => {
          const res = response.data
          if (res.error !== 0) {
              message.error(res.msg);
              return Promise.reject(res)
          }
          return Promise.resolve(res.data)
      }
  )

  export default instance


