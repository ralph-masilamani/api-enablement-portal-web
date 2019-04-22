import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core';
import { withRouter, RouteComponentProps} from 'react-router-dom';
import TopMenuBar from '../../screens/TopMenuBar';

interface Props extends RouteComponentProps {
    classes: any
}

export class DashboardLayout extends React.Component<Props & RouteComponentProps> {

    render(){
        const { classes } = this.props;
        return (
            <div>
               <TopMenuBar/>
            </div>
        )
    }
}

const styles = (theme:any) => createStyles({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

export default withRouter(withStyles(styles, { withTheme: true })(DashboardLayout))