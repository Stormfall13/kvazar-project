import React, { useContext } from 'react';
import { Context } from '../../index';
import {observer} from "mobx-react-lite";
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';

const NavBar = observer(() => {

    const {user} = useContext(Context)
    console.log(user);
    // const history = useLocation();
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        navigate(LOGIN_ROUTE)
    }

    return (
        <div>
            {user.isAuth ? 
            <button onClick={() => logOut()}>Выйти</button>
            :
            // <button onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</button>
            <button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</button>
        }
            
        </div>
    )
});

export default NavBar;
