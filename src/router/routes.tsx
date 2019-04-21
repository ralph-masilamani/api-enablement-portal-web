import { Notifications, AccountCircle, WebAsset, WebAssetTwoTone } from '@material-ui/icons';
import HomeLayout from '../components/layouts/HomeLayout';
import DashboardLayout from '../components/layouts/DashboardLayout'

import Page2 from '../screens/page2/Page2';
import AssetList from '../screens/assetList/AssetList'
import AssetSummaryByType from '../screens/assetSummary/AssetSummaryByType'

export class RouteConfig {
    constructor(
        public path: string,
        public component: any,
        public sidebarName?: string,
        public navbarName?: string,
        public icon?: any,
    ) {}
}

export const LayoutRoutes: RouteConfig[] = [
    new RouteConfig(
        '/home', HomeLayout
    ),
    new RouteConfig(
        '/dashboard', DashboardLayout
    ),
]

export const DashboardRoutes: RouteConfig[] = [
    
    new RouteConfig(
        '/dashboard/profile', Page2, 'Profile', 'Profile', AccountCircle
    ),
    new RouteConfig(
        '/dashboard/assetSummaryByType', AssetSummaryByType, 'Assets By Type', 'Assets By Type', WebAssetTwoTone
    ),
    new RouteConfig(
        '/dashboard/assetList', AssetList, 'Asset List', 'Asset List', WebAssetTwoTone
    )
]