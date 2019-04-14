import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, HashRouter, Switch, BrowserRouter as Router, Link } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

type Props = {

}

export default class DefaultRouter extends React.Component<Props> {

    render () {
        const history = createHistory();
        return (
                <Switch>
                    {routes.map((route) => (
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