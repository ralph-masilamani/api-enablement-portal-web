import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps} from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Login from '../../screens/login/Login';
import ResourceLoader from '../loader/ResourceLoader';

interface Props extends RouteComponentProps {
    classes: any
}

export class HomeLayout extends React.Component<Props> {

    componentDidMount() {
        console.log('loadded HomeLayout ')
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Login/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <ResourceLoader/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                           Welcome blah blah
                        </Paper>
                    </Grid>
                </Grid>
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

export default withRouter(withStyles(styles, { withTheme: true })(HomeLayout))