import * as React from 'react';
import './App.css';
import { observer, inject } from 'mobx-react';
import RootStore from './model/store/RootStore';
import DefaultRouter from './router/router';

type Props = {
  
}

export default class App extends React.Component<Props> {

  render() {
    return (
      <div>
          
          <TopMenuBar />
         
      </div>
      
    );
  }
}
