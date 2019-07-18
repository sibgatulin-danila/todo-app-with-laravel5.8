import React from 'react';
import {Link, Redirect} from 'react-router-dom'

import {commonStore} from './store/commonStore'

export default function Index(){
    return(    
        
        <div className="container h-100">
            <div className="row text-center align-items-center h-100">
                <div className="col-md-12 text-left">
                    <div className="col-md-12 text-center">
                        <h1>Todo app</h1>
                        <h2>To start use this application you need to login/registrate!</h2>
                        <Link to="/login">
                            <button className="btn btn-success">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="btn btn-warning" style={{marginLeft: 5}}>
                                Registrate
                            </button>
                        </Link>
                    </div>
                </div>    
            </div>
            {commonStore.isLogin ? (<Redirect to={commonStore.pathToTodos}/>) : ''}
        </div>
        
       
    )
}