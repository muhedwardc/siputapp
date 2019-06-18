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
        name: 'Beranda Akademik',
        meta: {
            requiresAuth: true,
            akademikRoute: true,
        },
        component: () => import('@/views/akademik/home.vue')
    },
    {
        path: '/daftar-dosen',
        name: 'Daftar Dosen',
        meta: {
            requiresAuth: true,
            akademikRoute: true,
        },
        component: () => import('@/views/akademik/list/dosen.vue')
    },
    {
        path: '/daftar-akademik',
        name: 'Daftar Akademik',
        meta: {
            requiresAuth: true,
            akademikRoute: true,
        },
        component: () => import('@/views/akademik/list/akademik.vue')
    },
    {
        path: '/ruang-sesi',
        name: 'Daftar Ruangan dan Sesi',
        meta: {
            requiresAuth: true,
            akademikRoute: true,
        },
        component: () => import('@/views/akademik/list/room.vue')
    },
    {
        path: '/pengurus-departemen',
        name: 'Pengurus Departemen',
        meta: {
            requiresAuth: true,
            akademikRoute: true,
        },
        component: () => import('@/views/akademik/principal.vue')
    },
    {
        path: '/dosen',
        name: 'Beranda Dosen',
        meta: {
            requiresAuth: true,
            dosenRoute: true,
        },
        component: () => import('@/views/dosen/home.vue')
    },
    {
        path: '/profil',
        name: 'Profil Dosen',
        meta: {
            requiresAuth: true,
            dosenRoute: true,
            akademikRoute: true
        },
        component: () => import('@/views/profile.vue')
    },
    {
        path: '/dosen/ujian',
        name: 'Daftar Ujian Dosen',
        meta: {
            requiresAuth: true,
            dosenRoute: true,
        },
        component: () => import('@/views/exam/list.vue')
    },
    {
        path: '/ujian',
        name: 'Daftar Ujian',
        meta: {
            requiresAuth: true,
            akademikRoute: true
        },
        component: () => import('@/views/akademik/list/exam.vue')
    },
    {
        path: '/ujian/tambah',
        name: 'Akademik Tambah Ujian',
        meta: {
            requiresAuth: true,
            akademikRoute: true,
        },
        component: () => import('@/views/akademik/add/exam.vue')
    },
    {
        path: '/ujian/:id',
        name: 'Detail Ujian',
        meta: {
            requiresAuth: true,
            dosenRoute: true,
            akademikRoute: true
        },
        component: () => import('@/views/exam/show.vue')
    },
    {
        path: '/ujian/:id/mulai',
        name: 'Ujian Mulai',
        meta: { 
            exam: true,
            requiresAuth: true,
            dosenRoute: true
        },
        component: () => import('@/views/exam/start.vue')
    },
    // {
    //     path: '/playground',
    //     name: 'Playground',
    //     meta: {
    //         requiresAuth: true,
    //         dosenRoute: true,
    //         akademikRoute: true
    //     },
    //     component: () => import('@/views/playground/index.vue')
    // },
    // {
    //     path: '/ujian/:id/dokumen-pendadaran',
    //     name: 'Dokumen Pendadaran',
    //     meta: {
    //         exam: true,
    //         isDocument: true,
    //         requiresAuth: true,
    //     },
    //     component: () => import('@/views/playground/document.vue')
    // },
    {
        path: '*',
        name: '404 Page Not Found',
        component: () => import('@/views/404.vue')
    }
]