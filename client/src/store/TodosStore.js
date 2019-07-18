import {observable} from 'mobx';

export const TodosStore = observable({
    id: '',
    task: '',
    todos: [],
    
    editDisabled: false,
})