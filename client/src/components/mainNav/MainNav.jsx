import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react'
import UserNameMenu from '../UserNameMenu/UserNameMenu';

const MainNav = () => {

    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    // Если компонент загружается, и пользователь не аутентифицирован, перенаправляем на Auth0
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            (async () => await loginWithRedirect())();
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    // Возвращаем контент только для аутентифицированных пользователей или null, если проверка ещё не завершена.
    return (
        <>
            {isLoading ? null : isAuthenticated && <UserNameMenu />}
        </>
    );
}

export default MainNav;
