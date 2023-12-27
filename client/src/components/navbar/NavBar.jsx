import React, { useContext } from 'react';
import { Context } from '../../index';
import {observer} from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';

const NavBar = observer(() => {

    const {user} = useContext(Context)
    const navigate = useNavigate();

    return (
        <div>
            {user.isAuth ? 
            <button onClick={() => navigate(LOGIN_ROUTE)}>Выйти</button>
            :
            <button onClick={() => user.setIsAuth(true)}>Авторизация</button>
        }
            
        </div>
    )
});

export default NavBar;
