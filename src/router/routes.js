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
        path: '/daftar-pengguna',
        name: 'Daftar Pengguna',
        component: () => import('@/views/akademik/list/user.vue')
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
        path: '/ujian',
        name: 'Ujian Show',
        component: () => import('@/views/akademik/list/exam.vue')
    },
    {
        path: '/ujian/tambah',
        name: 'Akademik Add Ujian',
        component: () => import('@/views/akademik/add/exam.vue')
    },
    {
        path: '/ujian/:id',
        name: 'Ujian Detail',
        component: () => import('@/views/ujian/show.vue')
    },
    {
        path: '/ujian/:id/mulai',
        name: 'Ujian Mulai',
        meta: { exam: true },
        component: () => import('@/views/ujian/start.vue')
    },
    {
        path: '/ujian/:id/tunggu',
        name: 'Ruang Ujian',
        meta: { exam: true },
        component: () => import('@/views/ujian/waiting.vue')
    },
    {
        path: '/playground',
        name: 'Playground',
        component: () => import('@/views/playground/index.vue')
    }
]