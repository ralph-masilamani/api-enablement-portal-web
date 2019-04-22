import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { computed, autorun } from 'mobx';
import { withRouter, RouteComponentProps} from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import {ResourceName} from '../../model/common/ResourceName';
import RootStore from '../../model/store/RootStore';

interface Props extends RouteComponentProps {
    rootStore?: RootStore,
    classes: any
}
type State = {
    resourceName: ResourceName,
    userName: string,
    password: string,
}  
@inject('rootStore')
@observer
export class Login extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
                resourceName: ResourceName.SIGN_IN,
                userName: '',
                password: '',
        }

        autorun( reaction => {
                    
            //TODO EVERY TIME WE CALL THIS WE TRY AND LOGIN / SIGNUP
            if (this.isAuthenticated == true) {
                console.log('we are authenticated .. ')
                this.doNavigate()
            } else {
                this.checkCallBack()
            }
        })
    }

    handleSubmit(event: any) {
        console.log('A event was submitted: ' + Object.keys(event).toString());
        // alert('A event was submitted: ' + event);
        event.preventDefault();
        this.invokeFetch()
    }

    handleChangeUserName = (event: any) => {
        this.setState({userName: event.target.value});
    }

    handleChangePassword = (event: any) => {
        this.setState({password: event.target.value});
    }

    invokeFetch() {

        if (this.props.rootStore) {
           console.log('LOGIN attempting to get SIGN IN..');
           //submit payload
           const body = {
               "user" : this.state.userName,
               "password" : this.state.password
           }
           this.props.rootStore.halStore.createResource(this.state.resourceName, body);
           
        }
    }

    checkCallBack() {
        if (this.props.rootStore) {
            const resp = this.props.rootStore.halStore.resources.get(this.state.resourceName)
            console.log('check callback, sign in resp ' + resp);
            if (resp) {
                this.props.rootStore.authStore.setCurrentUser(resp, true);
            }
        }
    }

    @computed get isAuthenticated(): boolean {
        
        if (this.props.rootStore) {
            const resp = this.props.rootStore.authStore.isAuthenticated
            console.log('we have isAuthenticated = ',resp)
            return resp
        }
        return false
    }

    doNavigate() {
        const history = this.props.history
        history.replace('/dashboard');
    }

    render () {
        const { classes } = this.props;
        return (
            <div>
                <form onSubmit= {(e) => this.handleSubmit(e)} className={classes.form}>
                <Grid container>
                    <Grid item xs={6}>
                        
                    </Grid>
                    <Grid item xs={2}>
                    
                        <TextField
                            required
                            id="outlined-required"
                            label="User Name"
                            className={classes.textField}
                            variant="outlined"
                            onChange={this.handleChangeUserName}
                            InputProps={{ classes: { input: classes.input1 } }}
                            />
                        
                    </Grid>
                    <Grid item xs={2}>
                        
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            onChange={this.handleChangePassword}
                            InputProps={{ classes: { input: classes.input1 } }}
                            />
                        
                    </Grid>
                    <Grid item xs={2}>
                       
                            <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}

                                >
                                    Sign in
                                    
                            </Button>
                        
                    </Grid>
                </Grid>
                </form> 
                
            </div>
        )
    }
}

const styles = (theme:any) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit, 
        
       
    },
    input1: {
        height: 10,
        fontSizeX: 2
      },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

const LoginWithStyle = withStyles(styles, { withTheme: true })(Login)
export default withRouter(LoginWithStyle);