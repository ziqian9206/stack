// 行为 ACTION类型 purchase sale withdraw type就可以改变
import {INIT_ACTION, SWITCH_MENU} from './actionType'
import Axios from 'axios';
import store from '../store'
export const switchMenu = (menuName) => ({
        type:SWITCH_MENU,
        menuName
})

export const initAction = (data) => ({
    type:INIT_ACTION,
    data
})

export const getInit = () => { 
    return (dispatch) => {
        Axios.get(`/v1/user/${sessionStorage.getItem('uid')}`).then((res) => {
            const data = res.data.data
            const action = initAction(data)
            store.dispatch(action)
        })
        
    }
}




