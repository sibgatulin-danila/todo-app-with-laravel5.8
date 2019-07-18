import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {observer} from 'mobx-react'
import { action } from 'mobx'
import store from 'store'

import Index from './StartPage'
import Login from './login/LoginPage'
import Register from './login/RegisterPage'
import Todo from './todoApp/Todo'

import { commonStore } from './store/commonStore'

export default @observer class App extends React.Component {

  @action
  componentWillMount(){
    this.getUser()
  }

  getUser = () => {
    try{
      if(store.get('user')){
        commonStore.user = Object.assign({}, store.get('user'))
      }
    }catch(e){
      console.log(e)
    }
  }

  render() {
    return (
      <Router>    

        <Route exact path="/" component={Index}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        {commonStore.isLogin ? (<Route exact path={commonStore.pathToTodos} component={Todo} />) : ''}
         
      </Router>
    )
  }
}


