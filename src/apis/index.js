import Vue from 'vue'
import exam from './exam'
import user from './user'
import auth from './auth';
import rooms_sessions from './rooms_sessions';

const thessa = {
    ...auth,
    ...exam,
    ...user,
    ...rooms_sessions
}

Vue.prototype.$thessa = thessa