import React, { useContext } from 'react';
import { Context } from '../../index';
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {

    const {user} = useContext(Context)

    return (
        <div>
            {user.isAuth ? 
            <button>Войти</button>
            :
            <button onClick={() => user.setIsAuth(true)}>Авторизация</button>
        }
            
        </div>
    )
});

export default NavBar;
