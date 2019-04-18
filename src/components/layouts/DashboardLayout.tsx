import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core';
import TopMenuBar from '../../screens/TopMenuBar';

type Props = {
    classes: any
}

export class DashboardLayout extends React.Component<Props> {

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

export default withStyles(styles, { withTheme: true })(DashboardLayout)