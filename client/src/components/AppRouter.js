// import React, {useContext} from 'react';
// // import { Switch, Route, Redirect } from 'react-router-dom';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { authRoutes, publicRoutes } from '../routes';
// import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts';
// import { Context } from '../index';


// const AppRouter = () => {

//     const {user} = useContext(Context)

//     return (
//         <div>
//             <Routes>
//                 {user.isAuth && authRoutes.map(({ path, Component }) =>
//                     <Route key={path} path={path} element={<Component />} replace={true} />
//                 )}
//                 {publicRoutes.map(({ path, Component }) =>
//                     <Route key={path} path={path} element={<Component />} replace={true} />
//                 )}
//                 {/* Редирект для несуществующих путей */}
//                 <Route path="*" element={user.isAuth ? <Navigate to={MAIN_ROUTE} replace /> : <Navigate to={LOGIN_ROUTE} replace />} />
//             </Routes>
//         </div>
//     )
// }

// export default AppRouter;
