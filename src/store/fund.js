import http from '../axios/index'
import {observable,action} from 'mobx';
/*
 * API: api/common/bizList
 * alias: MENULIST
 */

export default async function httpFund(store) {
    const data = await http.get(`/v1/user/${sessionStorage['uid']}`)
    store=data.data
    console.log(111,store)
    // sessionStorage.setItem('initfund',data.data.init)
    // sessionStorage.setItem('currentfund',data.data.current)
    // sessionStorage.setItem('stock',data.data.stock)
}


