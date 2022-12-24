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
            meta:{
                authRequired:false,
            }
        },
        {
            name:'login',
            path:'/login',
            component:Login,
            meta:{
                authRequired:false,
            }
        },
        {
            name:'register',
            path:'/register',
            component:Register,
            meta:{
                authRequired:false,
            }
        },
        {
            name:'dashboard',
            path:'/dashboard',
            component:Dashboard,
            meta:{
                authRequired:true,
            }
        },
        {
            name:'user',
            path:'/user/:username',
            component:User,
            meta:{
                authRequired:true,
            }
        }
    ]
})



router.beforeEach((to, from, next)=>{
    let token = sessionStorage.getItem("auth.linkbum")
    if(to.meta.authRequired === true){
      if(token){
        next();
      }else{
        next({name: 'login'});
      }
    } else {
        if(token){
            next({name:'dashboard'});
        }else{
            next();
        }
    }
})


export default router;