import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {observer} from 'mobx-react'
import {action} from 'mobx'

import axios from 'axios';
import store from 'store';

import {registerStore} from '../store/RegisterStore'
import { commonStore } from '../store/commonStore';


export default @observer class Register extends Component {

    @action
    handleRegister = () => {
        return axios.post('api/register', {
            name: registerStore.name,
            email: registerStore.email,
            password: registerStore.password,
            password_confirmation: registerStore.password_confirmation,
        })
        .then(response => {
            if(response.data.code===200){
                store.set('user', {
                    user_id: response.data.user_id,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': response.data.access_token
                    },
                })
                this.getUser()
                registerStore.isRegistrateSuccess = true
                return console.log('registration success!')
            }
            console.log('invalid data')
            return alert('registration data invalid')
        })
    }

    @action
    handleEdit = (e) => {
        registerStore[e.target.name] = e.target.value  
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
                <h1 className="text-center">Register page</h1>

                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                        <input type="Name" 
                        name='name'
                        onChange={
                            this.handleEdit
                        }
                        value={
                            registerStore.name
                        }
                        className="form-control" 
                        placeholder="Name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                        <input type="email" 
                        className="form-control" 
                        onChange={
                            this.handleEdit
                        }
                        value={
                            registerStore.email
                        }
                        name="email"
                        placeholder="Email"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                        <input type="password" 
                        name="password"
                        onChange={
                            this.handleEdit
                        }
                        className="form-control" 
                        value={registerStore.password}
                        placeholder="Password"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Confirm password</label>
                        <div className="col-sm-10">
                        <input type="password" 
                        name="password_confirmation"
                        onChange={
                            this.handleEdit
                        }
                        className="form-control"
                        value={registerStore.password_confirmation} 
                        placeholder="Password"/>
                        </div>
                    </div>
                    
                    <button type="submit" 
                    className="btn btn-primary"
                    onClick={(e)=>{
                        e.preventDefault()
                        this.handleRegister()
                    }}
                    >Register</button>
                    {registerStore.isRegistrateSuccess ? <Redirect to={commonStore.pathToTodos}/> : ''}
                </form>
            </div>
        )
    }
}