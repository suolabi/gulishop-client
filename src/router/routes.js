import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Trade from '@/pages/Trade'


export default [
    {
        path: '/pay',
        component: Pay
    },
    {
        path: '/paysuccess',
        component: PaySuccess
    },
    {
        path: '/trade',
        component: Trade
    },
    {
        path: '/shopcart',
        component: ShopCart
    },
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