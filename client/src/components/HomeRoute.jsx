import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Nothingness from '../pages/Nothingness/Nothingness'
import { reqMenuList } from '../api'
import { RouteList } from '../routes'

const HomeRoute = () => {

    const [homeRouteList, setHomeRouteList] = useState([])
    const { roleId } = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        getRouteList()
    }, [])

    const getRouteList = () => {
        reqMenuList().then((res) => {
            setHomeRouteList(res.data)
        })
    }
    const checkRoute = (item) => {
        return RouteList[item.key] && (item.state === 1 || item.routestate === 1)
    }
    const checkUserPermission = (item) => {
        return roleId.menus.includes(item.key)
    }
    return (
        <Switch>
            {
                homeRouteList.map(item => {
                    if (checkRoute(item) && checkUserPermission(item)) {
                        return <Route path={item.key} key={item.key} component={RouteList[item.key]} exact></Route>
                    }
                    return null

                })
            }
            <Redirect from='/' to="/homepage" exact ></Redirect>
            <Route path="*" component={Nothingness} ></Route>

        </Switch>
    )
}

export default HomeRoute