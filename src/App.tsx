import * as React from 'react';
import './App.css';
import { observer, inject } from 'mobx-react';
import RootStore from './model/store/RootStore';
import DefaultRouter from './router/router';

type Props = {
  rootStore?: RootStore,
}

@inject('rootStore')
@observer
export default class App extends React.Component<Props> {

  render() {
    return (
      <DefaultRouter/>
    );
  }
}
