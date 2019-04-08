import * as React from 'react';
import { History } from 'history';
import RootStore from '../../model/store/RootStore';

type Props = {
    rootStore?: RootStore
}

export default class Page2 extends React.Component<Props & {history: History}> {

    render() {
        const history = this.props.history
        return (
        
            <div>
               Page 2
                <br></br>
               <button onClick={() => history.replace('/')}>Back to Home</button>
            </div>
        )
    }
}