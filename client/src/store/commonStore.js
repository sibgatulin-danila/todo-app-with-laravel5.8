import {observable} from 'mobx';

export const commonStore = observable({
   
    user: {},

    get headers(){
        return this.user.headers
    },

    get user_id(){
        return this.user.user_id
    },

    get isLogin(){
        try{
            if(this.user.user_id){
                return true
            }
        }catch(e){}
        return false
    },

    get pathToTodos(){
       if(this.isLogin){
            return `/todos/${this.user.user_id}`     
       }
       return '/'
    }

})