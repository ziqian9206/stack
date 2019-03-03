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
            url:url,
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
            url:url,
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






// export function ajax_post(url,data,that,callback){
//     axios({
//         method:"POST",
//         headers:{'Content-type':'application/json',},
//         url:url,
//         data:data,
//     }).then(function(res){
//         console.log(url+'\tPost请求到:');
//         console.log(res);
//         if(res.error===0){
//             callback(that,res);
//         }else{
//             message.error(res.msg);
//         }
//         //ajax_get('/manage/getinfo',this);
//     }).catch(function(error){
//         message.error(String(error || '网络错误'))
//         console.log(error);
//     });
// }
// export function ajax_get(url,params,that,callback=()=>{}){
//     axios({
//         method:"GET",
//         headers:{'Content-type':'application/json',},
//         url:url,
//         params:params,
//         withCredentials:true
//     }).then(function(res){
//         console.log(url+'\tGet请求到:')
//         console.log(res);
//         let response = res.data
//         if(response.error===0){
//             callback(that,response);
//         }
//         else{
//             message.error(response.msg);
//         }
//     }).catch(function(error){
//         message.error(String(error || '请求失败'))
//         console.log(error);
//     });
// }
// export function ajax_post_params(url,data,that,callback=()=>{}){
//     axios({
//         method: 'post',
//         url: url,
//         headers: {
//             'Content-type': 'application/x-www-form-urlencoded',
//         },
//         params:data,
//     })
//     .then(function(res){
//         console.log(url+'\tPost请求到:');
//         console.log(res);
//         callback(that,res);
//         //ajax_get('/manage/getinfo',this);
//     }).catch(function(error){
//         message.error(String(error || '请求失败'))
//         console.log(error);
//     });
// }

