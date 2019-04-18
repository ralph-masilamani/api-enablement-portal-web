import * as React from 'react';
import './App.css';
import TopMenuBar from './screens/TopMenuBar';

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
