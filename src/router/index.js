import Vue from 'vue'
import VueRouter from 'vue-router'

//Views components
import HomeView from '../views/HomeView.vue'
import Dashboard from '../components/dashboard/Dashboard.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import ForgotPassword from '../components/auth/ForgotPassword.vue';
import ResetPassword from '../components/auth/ResetPassword.vue';

import AuthLayout from '../views/layouts/AuthLayout.vue';
import AppLayout from '../views/layouts/AppLayout.vue';
import Profile from '../components/profile/Profile.vue';
//middleware
import Middleware from '../middlewares/index.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      middleware: [Middleware.general]
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      middleware: [Middleware.general]
    }
  },
  {
    path: '/',
    component: AuthLayout,
    children:[
      {
        path: 'login',
        name: 'login',
        component: Login,
        meta: {
          middleware: [Middleware.guest]
        }
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
        meta: {
          middleware: [Middleware.guest]
        }
      },
      {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: ForgotPassword,
        meta: {
          middleware: [Middleware.guest]
        }
      },
      {
        path: '/reset-password',
        name: 'resetPassword',
        component: ResetPassword,
        meta: {
          middleware: [Middleware.guest]
        }
      },
    ]
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          middleware: [Middleware.auth]
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
        meta: {
          middleware: [Middleware.auth]
        }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function nextCheck(context, middleware, index) {
  const nextMiddleware = middleware[index];
  
  if(!nextMiddleware){
    return context.next;
  }
  return (...parameters) => {
    context.next(...parameters);
    const nextMidd = nextCheck(context, middleware, index + 1);
    
    nextMiddleware({...context, next: nextMidd})
  }
}

router.beforeEach( (to, from, next) => {
  if(to.meta.middleware){
    //establecer el middleware como Array
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

    const ctx = {
      from,
      next,
      router,
      to
    }

    const nextMiddleware = nextCheck(ctx, middleware, 1);
    
    return middleware[0]({...ctx, next: nextMiddleware});
  }
} );

export default router
