import {
    Dashboard,
    Category,
    AssignmentInd,
    ProductionQuantityLimits,
    AttachMoney
} from '@mui/icons-material';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const ICONS = {
    dashboard: <Dashboard />,
    category: <Category />,
    account: <AssignmentInd />,
    product: <ProductionQuantityLimits />,
    order: <AttachMoney />
};

const SIDEBAR_CONFIG = [
    {
        items: [
            {
                title: 'dashboard',
                path: PATH_DASHBOARD.root,
                icon: ICONS.dashboard
            },
        ]
    },
    {
        subheader: 'management',
        items: [
            {
                title: 'category',
                path: PATH_DASHBOARD.category.root,
                icon: ICONS.category,
                children: [
                    { title: 'list', path: PATH_DASHBOARD.category.list },
                    { title: 'create', path: PATH_DASHBOARD.category.create }
                    // { title: 'styles', path: PATH_DASHBOARD.category.styles }
                ]
            },
            {
                title: 'account',
                path: PATH_DASHBOARD.account.root,
                icon: ICONS.account,
                children: [
                    { title: 'list', path: PATH_DASHBOARD.account.list },
                    { title: 'create', path: PATH_DASHBOARD.account.create }
                ]
            },
            {
                title: 'product',
                path: PATH_DASHBOARD.product.root,
                icon: ICONS.product,
                children: [
                    { title: 'list', path: PATH_DASHBOARD.product.list },
                    { title: 'create', path: PATH_DASHBOARD.product.create }
                ]
            },
            {
                title: 'order',
                path: PATH_DASHBOARD.order.root,
                icon: ICONS.order,
                children: [
                    { title: 'list', path: PATH_DASHBOARD.order.list }
                ]
            }
        ]
    }
];

export default SIDEBAR_CONFIG;