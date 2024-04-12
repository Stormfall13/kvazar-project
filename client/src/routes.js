import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Main from './components/main/Main';
import {  LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE, ADWORK_ROUTE, MAIN_PAGE, TABLE_ROUTE } from './utils/consts';
import AdWork from './components/adwork/AdWork';
import MainPage from './pages/MainPage';
import GlobalTable from './components/global-table/GlobalTable';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    // {
    //     path: MAIN_ROUTE,
    //     Component: Main
    // },
    // {
    //     path: ADWORK_ROUTE,
    //     Component: AdWork
    // },
    // {
    //     path: MAIN_PAGE,
    //     Component: MainPage
    // },
    // {
    //     path: TABLE_ROUTE,
    //     Component: GlobalTable
    // }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
]