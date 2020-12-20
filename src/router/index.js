import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
//import TokenService from '../services/storage'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      public: true,  // Allow access to even if not logged in
      onlyWhenLoggedOut: true
    }
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },

  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/call/:id',
    name: 'call',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Call.vue')
  },

  {
    path: '/bids/:id',
    name: 'bids',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Bids.vue')
  },
  
  {
    path: '/calls',
    name: 'calls',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Calls.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// router.beforeEach((to)=>{

//   const isPublic = to.matched.some(record=>record.meta.public);
//   //const onlyWhenLoggedOut = to.matched.some(record=>record.meta.onlyWhenLoggedOut);

//   const loggedIn = !!TokenService.getToken();

//   console.log("isPublic is "+isPublic+"LOGGED IN IS "+loggedIn);

//   // if(!isPublic && !loggedIn){
//   //   return next({
//   //     path:'/login',
//   //     query:{ redirect: to.fullPath }

//   //   });
//   // }

//   // if(loggedIn){
//   //   return next('/');
//   //}

// });



export default router
