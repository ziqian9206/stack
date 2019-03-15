import { combineReducers } from 'redux';
import {INIT_ACTION, SWITCH_MENU} from '../action/actionType' 

const initialTitle = {
    title: '首页'
}

const initReducer = (state=initialTitle, action) => {
    switch (action.type) {
        case INIT_ACTION: {
          return {
            ...state,
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

// const allReducers = {
//   title: title,
//   init: init
// }

// const rootReducer = combineReducers(allReducers);

export default initReducer;