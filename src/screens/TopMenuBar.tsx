import * as React from 'react';

import classNames from 'classnames';
import { withStyles, createStyles } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Theme from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import routes from '../router/routes';
import DefaultRouter from '../router/router';
import RootStore from '../model/store/RootStore';

const drawerWidth = 240;

type Props = {
    rootStore?: RootStore
    classes: any
    theme: any
    location?: any
}
type State = {
    auth: boolean;
    open: boolean;
    anchorEl: null | HTMLElement;
}

class TopMenuBar extends React.Component<Props & RouteComponentProps<any>, State> {

    state: State = {
        auth: true,
        open: false,
        anchorEl: null,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };
    
    handleDrawerClose = () => {
        this.setState({ open: false });
    };


    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ auth: event.target.checked });
    };
    
    handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
     
    activeRoute(routeName: any) {
        if (this.props.location) {
            return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
        }
    }

    render () {
        const { classes, theme } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classes.appBar}
                    >
                    <Toolbar>
                    {/* 
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                        >
                        <MenuIcon />
                    </IconButton>
                    */}
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        API ENABLEMENT
                    </Typography>
                     {auth && (
                        <div>
                            <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                            >
                            <AccountCircle />
                            </IconButton>
                            <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                            >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                        )} 
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    anchor="left"
                    //open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    >
                   <div className={classes.toolbar} />
                    <Divider />
                    {/* <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text} selected={this.activeRoute2(text)}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                        ))}
                    </List> */}
                    <List>
                    {routes.map((prop, key) => {
                        return (
                            <Link to={prop.path} style={{ textDecoration: 'none' }} key={key}>
                            <MenuItem selected={this.activeRoute(prop.path)}>
                                <ListItemIcon>
                                    <prop.icon />   
                                </ListItemIcon>
                                <ListItemText primary={prop.sidebarName} />
                            </MenuItem>
                            </Link>
                        );
                    })}
                    </List>
                    <Divider />
                    {/* <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                        ))}
                    </List> */}
                </Drawer>                
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <DefaultRouter/>
                </main>
            </div>
        )
    }
}

const styles = (theme:any) => createStyles({
    root: {
        display: 'flex',
    },
    grow: {
      flexGrow: 1,
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

const ShowTheLocationWithRouter = withRouter(TopMenuBar);
export default withStyles(styles, { withTheme: true })(ShowTheLocationWithRouter)