import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'


export default [
    {
        path: '/addCartSuccess',
        component: AddCartSuccess
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/detail/:goodsId',
        component: Detail
    },
    {
        path: '/search/:keyword?',
        component: Search,
        name: 'search',
        // props:true
        // props:{name:'zhaoliying'},
        props(route) {
            return {
                keyword: route.params.keyword,
                keyword2: route.query.keyword2
            }
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isHide: true
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            isHide: true
        }
    },
    {
        path: '/',
        redirect: '/home'
    }
]