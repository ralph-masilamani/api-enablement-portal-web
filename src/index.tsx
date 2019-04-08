import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import RootStore from './model/store/RootStore';
import DefaultRouter from './router/router';
import App from './App';

const rootStore: RootStore = new RootStore();

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, rootStore.routingStore);

ReactDOM.render(
  <Provider rootStore={rootStore}>
    <Router history={history}>
        <App/>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
