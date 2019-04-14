import { Notifications, AccountCircle } from '@material-ui/icons';
import Home from '../screens/home/Home';
import Page2 from '../screens/page2/Page2';
import AssetList from '../screens/assetList/AssetList'

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
  },
  {
    path: '/assetList',
    sidebarName: 'Asset List',
    navbarName: 'Asset List',
    icon: AccountCircle,
    component: AssetList
  }
];

export default Routes;