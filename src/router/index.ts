import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue"
import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"
import Dashboard from "../pages/Dashboard.vue"
import User from "../pages/User.vue"

const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            name:'Home',
            path:'',
            component:Home,
        },
        {
            name:'login',
            path:'/login',
            component:Login,
        },
        {
            name:'register',
            path:'/register',
            component:Register,
        },
        {
            name:'dashboard',
            path:'/dashboard',
            component:Dashboard,
        },
        {
            name:'user',
            path:'/user/:username',
            component:User,
        }
    ]
})

export default router;