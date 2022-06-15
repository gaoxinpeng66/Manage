import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'

const RoutesPageBox = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" render={()=>
                localStorage.getItem("token")?
                <Home></Home>:
                <Redirect to="/login" />
                } />
            </Switch>
        </BrowserRouter>
    )
}

export default RoutesPageBox