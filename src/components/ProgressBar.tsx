import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
  classes: any
}

class ProgressBar extends React.Component<Props> {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <CircularProgress className={classes.progress} />
            </div>
        )
    }
}

const styles = (theme:any) => createStyles({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

export default withStyles(styles, { withTheme: true })(ProgressBar)
