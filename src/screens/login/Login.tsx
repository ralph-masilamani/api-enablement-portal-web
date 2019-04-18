import * as React from 'react';
import { Link, withRouter, RouteComponentProps} from 'react-router-dom';

type Props = {
    
}
  
export class Login extends React.Component<Props & RouteComponentProps<any>> {

    render () {
        return (
            <div>
                <Link to="/dashboard">Login via link</Link>
            </div>
        )
    }
}

export default withRouter(Login);