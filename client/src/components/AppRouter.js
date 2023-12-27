import React, {useContext} from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Context } from '../index';

const AppRouter = () => {

    // const isAuth = false
    const {user} = useContext(Context)

    // console.log(user);

    return (
        <div>
            <Routes>
                {user.isAuth && authRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
                {/* Редирект для несуществующих путей */}
                <Route path="*" element={user.isAuth ? <Navigate to={ADMIN_ROUTE} replace /> : <Navigate to={LOGIN_ROUTE} replace />} />
            </Routes>
        </div>
    )
}

export default AppRouter;
