import MainLayout from 'layouts/MainLayout'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        meta: {
          title: 'Home',
          roles: [],
          sidebar: true,
          icon: 'user'
        },
        component: () => import('pages/Index.vue')
      },
      {
        path: 'session',
        meta: {
          title: 'Session Management',
          roles: [],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Session.vue')
      },
      {
        path: 'user',
        meta: {
          title: 'User Management',
          roles: [],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/User.vue')
      },
      {
        path: 'postage',
        meta: {
          title: 'Postage',
          roles: [],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Postage.vue')
      },
      {
        path: 'product',
        meta: {
          title: 'Product Management',
          roles: [],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Product.vue')
      },
      {
        path: '/profile',
        meta: {
          sidebar: false,
        },
        component: () => import('pages/User/Profile.vue')
      },
    ]
  },

  {
    path: '/login',
    meta: {
      title: 'Login',
      sidebar: false,
      roles: []
    },
    component: () => import('pages/Auth/Login.vue')
  },


  {
    path: '/register',
    meta: {
      title: 'Registration',
      roles: [],
      sidebar: false
    },
    component: () => import('pages/Auth/Register.vue')
  },

  // Always leave this as last one,
  // but you can also remove i
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
