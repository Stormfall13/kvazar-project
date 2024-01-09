import React, { useContext } from 'react';
import { Context } from '../../index';
import {observer} from "mobx-react-lite";
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';

const NavBar = observer(() => {

    const {user} = useContext(Context)
    const history = useLocation();

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <div>
            {user.isAuth ? 
            <button onClick={() => logOut()}>Выйти</button>
            :
            <button onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</button>
        }
            
        </div>
    )
});

export default NavBar;
