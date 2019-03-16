// 行为 ACTION类型 purchase sale withdraw type就可以改变
import {INIT_ACTION, SWITCH_MENU} from './actionType'
import axios from 'axios';
export const switchMenu = (menuName) => ({
    type:SWITCH_MENU,
    menuName:[menuName]
})

export const initAction = (data) => ({
    type:INIT_ACTION,
    data
})

export const getInit = () => {
    return (dispatch) => {
		axios.get(`/v1/user/${sessionStorage.getItem('uid')}`).then((res) => {
            const data = res.data;
			dispatch(initAction(data.data));
		}).catch(() => {
			console.log('error');
		})
	}
};




