import axios from 'axios'
import store from '../store'

let config = {
    baseURL: process.env.VUE_APP_API,
    headers: {
      'Content-Type': 'application/json',
    }
}

let instance = axios.create(config)
instance.interceptors.request.use(
    function(config) {
        const token = store.state.auth.token
        if (token) config.headers['Authorization'] = `Token ${token}`
        if (store.state.useUploadProgress) {
            const CancelToken = axios.CancelToken
            store.state.cancelTokenSource = CancelToken.source()
            store.state.asyncProgress = 0
            config['cancelToken'] = store.state.cancelTokenSource.token
            config.onUploadProgress = (progressEvent) => { 
                store.state.asyncProgress = Math.round( (progressEvent.loaded * 100) / progressEvent.total)
            }
        }
        return config
    },
    function(error) {
        return Promise.reject(error);
    }
)

export default instance