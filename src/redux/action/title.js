// 行为 ACTION类型
export const type = {
    SWITCH_MENU:"SWITCH_MENU"
}

export function switchMenu(menuName){
    return{
        type:type.SWITCH_MENU,
        menuName
    }
}









