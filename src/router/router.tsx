import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, HashRouter, Switch, BrowserRouter as Router, Link } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import Home from '../screens/home/Home';
import Page2 from '../screens/page2/Page2';

type Props = {

}

export default class DefaultRouter extends React.Component<Props> {

    render () {
        //const history = createHistory();
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/page2" component={Page2} />
                </Switch>
            </HashRouter>
        )
    }
}