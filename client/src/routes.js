import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Main from './components/main/Main';
import {  LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE } from './utils/consts';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: MAIN_ROUTE,
        Component: Main
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