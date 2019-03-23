export default [
    {
        path: '/',
        name: 'Home',
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/akademik',
        name: 'Akademik Home',
        component: () => import('@/views/akademik/home.vue')
    },
    {
        path: '/tambah/ujian',
        name: 'Akademik Add Ujian',
        component: () => import('@/views/akademik/add/exam.vue')
    },
    {
        path: '/dosen',
        name: 'Dosen Home',
        component: () => import('@/views/dosen/home.vue')
    },
    {
        path: '/dosen/profil',
        name: 'Dosen Profil',
        component: () => import('@/views/dosen/profil.vue')
    },
    {
        path: '/dosen/ujian',
        name: 'Dosen Ujian',
        component: () => import('@/views/dosen/ujian.vue')
    },
    {
        path: '/ujian/:id',
        name: 'Ujian Show',
        component: () => import('@/views/ujian/show.vue')
    },
    {
        path: '/ujian/:id/mulai',
        name: 'Ujian Mulai',
        component: () => import('@/views/ujian/start.vue')
    }
]