import React, { useContext } from 'react';
import { Context } from '../../index';

const NavBar = () => {

    const {user} = useContext(Context)

    return (
        <div>
            <button>Авторизация</button>
        </div>
    )
}

export default NavBar;
