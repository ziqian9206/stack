// 行为 ACTION类型 purchase sale withdraw type就可以改变
import {INIT_ACTION, SWITCH_MENU, POSITON_ACTION, STOCK_ACTION} from './actionType'
import http from '../../axios'

export const switchMenu = (menuName) => ({
    type:SWITCH_MENU,
    menuName:[menuName]
})

export const initAction = (data) => ({
    type:INIT_ACTION,
    data
})

export const positionAction = (position) => ({
    type:POSITON_ACTION,
    position
})
//初始化请求
export const getInit = () => {
    return (dispatch) => {
        http.get(`/v1/user/${sessionStorage.getItem('uid')}`)
        .then(res => dispatch(initAction(res)));
    }
};
//持仓请求
export const getPosition = () => {
    return (dispatch) => {
        http.get(`/v1/stock/hold/${sessionStorage.getItem('uid')}`)
        .then(res => {
            dispatch(positionAction(res))
        });
    }
};

//股票请求action
export const stockAction = (stock) => ({
    type:STOCK_ACTION,
    stock
})

//股票请求
export const getStock = (item) => {
    return (dispatch) => {
        http.get(`/v1/stock/${item}`)
        .then(res => {
            dispatch(stockAction(res))
        })
    }
}

