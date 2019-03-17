import { combineReducers } from 'redux';
import {INIT_ACTION, SWITCH_MENU, POSITON_ACTION, STOCK_ACTION} from '../action/actionType' 
import http from '../../axios'
const initialTitle = {
    menuName: ['首页'],
}

const initReducer = (state=initialTitle, action) => {
    switch (action.type) {
        case INIT_ACTION: {
          return {
            ...state,
            initData:action.data
          }
        }
        case SWITCH_MENU:{
            return{
                ...state,
                menuName:action.menuName
            }
        }
        case POSITON_ACTION:{
          action.position.map( async item => {
              const info = await http.get(`/v1/stock/${item.sid}`)
              item['currentPrice'] = Number(info.currentPrice)
              item.yesterdayEnd = info.yesterdayEnd
              item.rate = (item.currentPrice - item.yesterdayEnd) / item.yesterdayEnd
            })
            return Object.assign({}, state, {
              position: action.position
            })
        }
        case STOCK_ACTION : {
          return {
            ...state,
            stockData:action.stock
          }
        } 
        default:
          return state;
      }
}

export default initReducer;