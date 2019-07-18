import React, {Component} from "react"
import {Link} from 'react-router-dom'
import { observer } from 'mobx-react'
import { action } from 'mobx'

import {addTodo, deleteTodo, getTodos, updateTodo, completeTodo} from './TodoFunction'

import {TodosStore} from '../store/TodosStore'
import {loginStore} from '../store/LoginStore'
import {registerStore} from '../store/RegisterStore'
import { commonStore } from "../store/commonStore";

import store from 'store'

export default @observer class Todo extends Component{

    @action
    onSubmit = () => {
        addTodo(TodosStore.task)
        TodosStore.task = ''
        this.getAll()
    }

    @action
    onChange = () => {
        TodosStore.task = this.inputNode.value
    }

    @action
    onCompleted = (item) => {
        completeTodo(!item.completed, item.id)
        this.getAll()
        console.log(item.completed)
    } 

    @action
    onUpdate = () => {
        updateTodo(TodosStore.task, TodosStore.id)
        
        TodosStore.task = ''
        TodosStore.id = ''
        TodosStore.editDisabled = false
    
        this.getAll()
    }

    @action
    onEdit = (item) => {
            TodosStore.task = item.task
            TodosStore.id = item.id
            TodosStore.editDisabled = true
    }

    @action
    onLogout =(props) => {
        store.remove('user')
        commonStore.user = {}
        props.history.push('/')
    }

    @action
    onDelete = (itemid) => {
        deleteTodo(itemid)
        this.getAll()
    }

    @action
    componentWillMount(){
        loginStore.isLoginSuccess = false
        registerStore.isRegistrateSuccess = false
        this.getAll()
    }

    @action
    getAll = () => {
        getTodos().then(response => {
            TodosStore.task = ''
            TodosStore.todos = [...response.data].reverse()
        })
    }

    render(){
       console.log(this.props)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-7 mx-auto text-right">
                        <h1> TodosList </h1>
                    </div>
                    <div className="col-md-5 mx-auto text-right">
                        <Link to='/' >
                            <button className="btn btn-outline-danger"
                            onClick={(e)=>{e.preventDefault()
                                            this.onLogout(this.props)
                            }}
                            >
                                Logout
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9 mx-auto">
                        <div className="form-group" >
                            <input type="text"
                            className="form-control"
                            ref={node => this.inputNode = node}
                            onChange={this.onChange}
                            value={TodosStore.task}
                            style={{marginBottom: 5}}
                            />
                            {!TodosStore.editDisabled ? (
                                <button className="btn btn-success btn-block"
                                onClick={(e)=> {e.preventDefault()
                                                this.onSubmit()}
                                }
                                >Add todo</button>
                            ) : (
                                <button className="btn btn-success btn-block"
                                onClick={(e) => {e.preventDefault()
                                    this.onUpdate()}}
                                >Update todo</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9 mx-auto">
                        <table className="table">
                            <tbody>        
                                {TodosStore.todos.map((todo, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="row">
                                                <div className="col-md-9">
                                                    <input type="checkbox" 
                                                    onChange={(e)=>{
                                                        e.preventDefault()
                                                        this.onCompleted(todo)
                                                    }}
                                                    checked={todo.completed}
                                                    />
                                                    {todo.completed ? (
                                                        <s>{todo.task}</s>
                                                    ) : (
                                                        todo.task
                                                    )}
                                                </div>
                                                <div className="col-md">
                                                    <button className="btn btn-outline-info"
                                                    onClick={(e) => {e.preventDefault()
                                                        this.onEdit(todo)}}
                                                    >
                                                        edit
                                                    </button>
                                                    <button className="btn btn-danger"
                                                    onClick={(e)=> {e.preventDefault()
                                                        this.onDelete(todo.id)}}
                                                    >
                                                        delete
                                                    </button>
                                                </div>
                                                
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}