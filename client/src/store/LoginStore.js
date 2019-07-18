import {observable} from 'mobx';

export const loginStore = observable({
    email: '',
    password: '',

    isLoginSuccess: false,
})