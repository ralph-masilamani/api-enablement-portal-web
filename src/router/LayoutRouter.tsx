import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Redirect, Switch, BrowserRouter as Router, Link } from 'react-router-dom';
import {LayoutRoutes} from './Routes';
import createHistory from 'history/createBrowserHistory';

type Props = {

}

export default class LayoutRouter extends React.Component<Props> {

    render () {
        const history = createHistory();
        return (
                <Switch>
                
                    <Route exact path="/">  
                        <Redirect to="/home" />  
                    </Route>
                    {LayoutRoutes.map((route) => (
                        <Route
                   
                        key={route.path}
                        path={route.path}
                        component={route.component}
                        />
                    ))}    
                    
                </Switch>
        )
    }
}