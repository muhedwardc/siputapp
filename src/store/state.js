import Cookies from 'js-cookie'
const userData = Cookies.getJSON('_usr')
const userToken = Cookies.getJSON('_tkn')
const state = {
    auth: {
        token: userToken || null,
        user: userData || null,
        google: null,
        isSignIn: null
    },
    asyncProgress: null,
    useUploadProgress: false,
    cancelTokenSource: null,
    snackbar: {
        show: false,
        message: '',
        type: 'success'
    },
    alert: {
        show: false,
        message: '',
        type: 'success',
        action: false
    },
    loadError: {
        show: false,
        message: 'Unable to load'
    },
    onExam: {
        id: false
    },
    sidebar: true,
    dashboard: false,
    dialog: false,
    drawer: true,
    loadViewContent: true
}

export default state