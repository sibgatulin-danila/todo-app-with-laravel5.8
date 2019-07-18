import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import axios from 'axios';
import store from 'store'

import {loginStore} from '../store/LoginStore'
import { commonStore } from '../store/commonStore'



export default @observer class Login extends Component {
    
    @action
    handleLogin = () => {
        return axios.post('api/login', {
            email: loginStore.email,
            password: loginStore.password
        })
        .then(response => {
            if(response.data.code === 401){
                return alert("incorrect data!")
            }
            store.set('user', {
                user_id: response.data.user_id,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': response.data.access_token
                },
            })
            this.getUser()
            loginStore.isLoginSuccess = true
        })
    }

    @action
    handleEdit = (e) => {
        loginStore[e.target.name] = e.target.value  
    }

    componentDidMount(){
    }


    getUser = () => {
        try {
            if (store.get('user')) {
                commonStore.user = Object.assign({}, store.get('user'))
            }
        } catch (e) {
            console.log(e)
        }
    }

    render(){
        return (
            <div className="container">
                <h1 className="text-center">Login page</h1>

                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                        <input type="email" 
                        onChange={
                            this.handleEdit
                        }
                        name='email'
                        className="form-control" 
                        placeholder="Email"
                        value={loginStore.email}
                        />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                        <input type="password" 
                        onChange={
                            this.handleEdit
                        }
                        name="password"
                        className="form-control" 
                        placeholder="Password"
                        value={loginStore.password}
                        />
                        </div>
                    </div>
                    
                        <button type="submit" 
                        onClick={
                            (e) => {
                                e.preventDefault()
                                this.handleLogin()
                            }
                        } 
                        className="btn btn-primary">Login</button>
                    {loginStore.isLoginSuccess ? <Redirect to={commonStore.pathToTodos}/> : ''}
                </form>
            </div>
        )
    }
}