import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login'
import home from '../components/home'
import welcome from '../components/welcome'
import student from '../components/student'
import subject from '../components/subject'
import users from '../components/users'
import score from '../components/score'
import books from '../components/books'
import test from '../components/test'


Vue.use(VueRouter)


//路由配置
const routes = [
    {
        //默认跳登陆页面
        path: '/',
        redirect: '/login'
    },
    {
        //登陆页面
        path: '/login',
        component: login
    },
    {
        //主页页面 主页配置子模块地址
        path: '/home',
        component: home,
        //转发默认的子模块
        redirect: '/welcome',
        children: [
            {path: '/welcome', component: welcome},
            {path: '/student', component: student},
            {path: '/subject', component: subject},
            {path: '/user', component: users},
            {path: '/score', component: score},
            {path: '/test', component: test},
            {path: '/books', component: books},
        ]
    }

]

const router = new VueRouter({
    routes
})


//路由守卫 判断是不是有token 没有的话 给他跳登陆页面
router.beforeEach(
    (to, from, next) => {
        if (to.path == '/login') return next()
        var token = window.sessionStorage.getItem('token')
        if (token != null) {
            next()
        } else {
            next('/login')
        }
    }
)

export default router
