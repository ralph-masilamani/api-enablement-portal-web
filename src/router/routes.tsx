import { Notifications, AccountCircle } from '@material-ui/icons';
import Home from '../screens/home/Home';
import Page2 from '../screens/page2/Page2';
import AssetList from '../screens/assetList/AssetList'

export class RouteConfig {
    constructor(
        public path: string,
        public sidebarName: string,
        public navbarName: string,
        public icon: any,
        public component: any
    ) {}
}

const Routes: RouteConfig[] = [
    new RouteConfig(
        '/home' ,'Home' ,'Home' ,Notifications , Home
    ),
    new RouteConfig(
        '/profile', 'Profile', 'Profile', AccountCircle, Page2
    ),
    new RouteConfig(
        '/assetList', 'Asset List', 'Asset List', AccountCircle, AssetList
    )
]

export default Routes;