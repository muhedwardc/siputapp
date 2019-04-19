export default [
    {
        path: '/',
        name: 'Home',
    },
    {
        path: '/login',
        name: 'Login',
        meta: { publicRoute: true },
        component: () => import('@/views/login.vue')
    },
    {
        path: '/akademik',
        name: 'Akademik Home',
        meta: {
            requiresAuth: true,
            akademikRoute: true,
        },
        component: () => import('@/views/akademik/home.vue')
    },
    {
        path: '/daftar-pengguna',
        name: 'Daftar Pengguna',
        meta: {
            requiresAuth: true,
            akademikRoute: true,
        },
        component: () => import('@/views/akademik/list/user.vue')
    },
    {
        path: '/dosen',
        name: 'Dosen Home',
        meta: {
            requiresAuth: true,
            dosenRoute: true,
        },
        component: () => import('@/views/dosen/home.vue')
    },
    {
        path: '/dosen/profil',
        name: 'Dosen Profil',
        meta: {
            requiresAuth: true,
            dosenRoute: true,
        },
        component: () => import('@/views/dosen/profil.vue')
    },
    {
        path: '/dosen/ujian',
        name: 'Dosen Ujian',
        meta: {
            requiresAuth: true,
            dosenRoute: true,
        },
        component: () => import('@/views/dosen/ujian.vue')
    },
    {
        path: '/ujian',
        name: 'Ujian Show',
        meta: {
            requiresAuth: true,
            akademikRoute: true
        },
        component: () => import('@/views/akademik/list/exam.vue')
    },
    {
        path: '/ujian/tambah',
        name: 'Akademik Add Ujian',
        meta: {
            requiresAuth: true,
            akademikRoute: true,
        },
        component: () => import('@/views/akademik/add/exam.vue')
    },
    {
        path: '/ujian/:id',
        name: 'Ujian Detail',
        meta: {
            requiresAuth: true,
            dosenRoute: true,
            akademikRoute: true
        },
        component: () => import('@/views/ujian/show.vue')
    },
    {
        path: '/ujian/:id/mulai',
        name: 'Ujian Mulai',
        meta: { 
            exam: true,
            requiresAuth: true,
            dosenRoute: true
        },
        component: () => import('@/views/ujian/start.vue')
    },
    {
        path: '/ujian/:id/tunggu',
        name: 'Ruang Ujian',
        meta: { 
            exam: true,
            requiresAuth: true,
            dosenRoute: true
        },
        component: () => import('@/views/ujian/waiting.vue')
    },
    {
        path: '/playground',
        name: 'Playground',
        meta: {
            requiresAuth: true,
            dosenRoute: true,
            akademikRoute: true
        },
        component: () => import('@/views/playground/index.vue')
    }
]