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
        const asyncLoading = store.state.asyncLoading
        if (token) config.headers['Authorization'] = `Token ${token}`
        if (asyncLoading) config.onUploadProgress = (progressEvent) => this.uploadingScriptProgress = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
        return config
    },
    function(error) {
        return Promise.reject(error);
    }
)

export default instance