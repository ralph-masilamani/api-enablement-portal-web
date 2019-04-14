import * as React from 'react';
import { History } from 'history';
import RootStore from '../../model/store/RootStore';
import { Link, withRouter, RouteComponentProps} from 'react-router-dom';

type Props = {
  rootStore?: RootStore;
};

class Page2 extends React.Component<Props & RouteComponentProps<any>> {

    render() {
        const history = this.props.history
        return (
        
            <div>
               Page 2
                <br></br>
               <button onClick={() => history.replace('/home')}>Back to Home</button>
               Page 2
                <br></br>
                Page 2
                <br></br>
                Page 2
                <br></br>
                Page 2
                <br></br>
                <Link to="/home">home via link</Link>
            </div>
        )
    }
}
export default withRouter(Page2);
