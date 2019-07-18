import axios from 'axios';

import {commonStore} from '../store/commonStore'

export const getTodos = () => {
    return axios.get(`/api/todos/${commonStore.user_id}`, {
        headers: commonStore.headers   
    })
}

export const addTodo = (task) => {
    axios.post(`/api/todos/${commonStore.user_id}`, {
        task: task,
        user_id: commonStore.user_id,
    }, {
        headers: commonStore.headers
    })
}

export const deleteTodo = (id) => {
    axios.delete(`/api/todos/${commonStore.user_id}/${id}`,{
        headers: commonStore.headers
    })
    .catch(err=>console.log(err))
    .then(res => console.log(res))
}

export const completeTodo = (isCompleted, id) => {
    axios.put(`/api/todos/${commonStore.user_id}/${id}`, {
        completed: isCompleted,
    },{
        headers: commonStore.headers
    })
}

export const updateTodo = (task, id) => {
    axios.put(`/api/todos/${commonStore.user_id}/${id}`, {
        task: task,
    },{
        headers: commonStore.headers
    })
}