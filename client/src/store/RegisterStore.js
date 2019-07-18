import {observable} from 'mobx';

export const registerStore = observable({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    
    isRegistrateSuccess: false
})