import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Main from './components/main/Main';
import {  LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE, ADWORK_ROUTE } from './utils/consts';
import AdWork from './components/adwork/AdWork';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: ADWORK_ROUTE,
        Component: AdWork
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }

]