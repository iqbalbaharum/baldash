import MainLayout from 'layouts/MainLayout'
import SKLayout2 from 'layouts/SKLayout2'

const routes = [

  {
    path: '/sklayout2',
    meta: {
      title: 'Website',
      sidebar: false,
      roles: []
    },
    component: SKLayout2,
    children: [

      {
        path: '/customerlist',
        component: () => import('pages/CustomerList.vue')
      },
      {
        path: '/graph',
        component: () => import('pages/Graph.vue')
      },

    ]
  },

  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        meta: {
          sidebar: false
        },
        component: () => import('pages/Index.vue')
      },
      {
        path: 'dashboard',
        meta: {
          title: 'Dashboard',
          roles: [],
          sidebar: true,
          icon: 'home'
        },
        component: () => import('pages/Dashboard.vue')
      },
      {
        path: 'session',
        meta: {
          title: 'Session Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Session.vue')
      },
      {
        path: 'user',
        meta: {
          title: 'User Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/User.vue')
      },
      {
        path: 'asset',
        meta: {
          title: 'Asset Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Assets.vue')
      },
      {
        path: 'dashboard',
        meta: {
          title: 'Session Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Session.vue')
      },
      {
        path: 'user',
        meta: {
          title: 'User Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/User.vue')
      },
      {
        path: 'asset',
        meta: {
          title: 'Asset Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Assets.vue')
      },
      {
        path: 'myprofile',
        meta: {
          title: 'Customizer',
          roles: [],
          sidebar: true,
          icon: 'home'
        },
        component: () => import('pages/Profile.vue')
      }
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

  // {
  //   path: '/first-time-registration',
  //   meta: {
  //     title: 'First Time Registration',
  //     roles: [],
  //     sidebar: false
  //   },
  //   component: () => import('pages/Auth/FirstTimeRegister.vue')
  // },

  {
    path: '/register',
    meta: {
      title: 'Registration',
      roles: ['user'],
      sidebar: false
    },
    component: () => import('pages/Auth/Register.vue')
  },

  {
    path: '/401',
    component: () => import('pages/Error401.vue')
  },

  // Always leave this as last one,
  // but you can also remove i
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
