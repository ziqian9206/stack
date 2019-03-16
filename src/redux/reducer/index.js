import { combineReducers } from 'redux';
import {INIT_ACTION, SWITCH_MENU} from '../action/actionType' 

const initialTitle = {
    menuName: ['首页']
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
        default:
          return state;
      }
}

export default initReducer;