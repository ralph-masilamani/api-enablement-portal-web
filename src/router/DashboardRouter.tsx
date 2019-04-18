import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom';
import {DashboardRoutes} from './Routes';
import createHistory from 'history/createBrowserHistory';

type Props = {

}

export default class DashboardRouter extends React.Component<Props> {

    render () {
        const history = createHistory();
        return (
                <Switch>
                    {DashboardRoutes.map((route) => (
                        <Route
                        exact
                        key={route.path}
                        path={route.path}
                        component={route.component}
                        />
                    ))}         
                </Switch>
        )
    }
}