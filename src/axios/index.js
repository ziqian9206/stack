import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

let http = {
    post:'',
    get:''
}

http.post = (url,data,callback)=>{
    return new Promise((resolve,reject)=>{
        axios({
            method:"POST",
            headers:{'Content-type':'application/json',},
            url:`http://127.0.0.1:7001/${url}`,
            data:data,
        }).then((res)=>{
            const response = res.data
            if(response.error === 0){
                message.success(response.msg)
                resolve(response)
                callback()
            }else{
                message.error(response.msg)
            }
        })
    })
}

http.get = (url,data)=>{
    return new Promise((resolve,reject)=>{
        axios({
            method:"GET",
            headers:{'Content-type':'application/json',},
            url:`http://127.0.0.1:7001/${url}`,
            params:data,
        }).then((res)=>{
            const response = res.data
            if(response.error === 0){
                message.success(response.msg)
                resolve(response)
            }else{
                message.error(response.msg)
            }
        }).catch((err)=>{
            console.log('err',err)
        })
    })
}
export default http






