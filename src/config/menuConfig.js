const menuList = [
    {
        title: '模拟练习区',
        key: '/home'
    },
    {
        title: '个人中心',
        key: '/ui',
    },
    {
        title: '我的大赛',
        key: '/mine',
    },
    {
        title: '找课程',
        key: '/course',
    },
    {
        title: '找牛人',
        key: '/people',
    },
    {
        title: '找牛股',
        key: '/stack',
    },
    {
        title: '权限设置',
        key: '/permission'
    },
    {
        title: '登录注册',
        key: '/log',
        children:[
            {
                title: '登录',
                key: '/log/login',
            },
            {
                title: '注册',
                key: '/log/reg',
            }
        ]
    },
    
];
export default menuList;