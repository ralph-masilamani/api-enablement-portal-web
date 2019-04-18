import * as React from 'react';
import './App.css';
import LayoutRouter from './router/LayoutRouter';

type Props = {
  
}

export default class App extends React.Component<Props> {

  render() {
    return (
      <div>
          <LayoutRouter/>
      </div>
      
    );
  }
}
