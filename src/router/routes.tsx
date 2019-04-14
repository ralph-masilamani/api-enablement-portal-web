import { Notifications, AccountCircle } from '@material-ui/icons';
import Home from '../screens/home/Home';
import Page2 from '../screens/page2/Page2';

const Routes = [
  {
    path: '/home',
    sidebarName: 'Home',
    navbarName: 'Home',
    icon: Notifications,
    component: Home
  },
  {
    path: '/profile',
    sidebarName: 'Profile',
    navbarName: 'Profile',
    icon: AccountCircle,
    component: Page2
  }
];

export default Routes;