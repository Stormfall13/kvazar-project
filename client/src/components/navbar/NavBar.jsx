import React, { useContext } from 'react';
import { Context } from '../../index';
import {observer} from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';



const NavBar = observer(() => {

    const {user} = useContext(Context)
    // const history = useLocation();
    const navigate = useNavigate();
    

    // const logOut = () => {
    //     user.setUser({})
    //     user.setIsAuth(false)
    //     localStorage.removeItem('token');
    //     navigate(LOGIN_ROUTE)
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        // Отправка данных на сервер
        fetch('http://localhost:5000/api/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
            })
            .then((response) => response.json())
            .then((data) => {
            // Обработка ответа от сервера
            // console.log(data);
            })
            .catch((error) => {
            // Обработка ошибки
            console.error(error);
        });
    }


    return (
        <div>
            {user.isAuth ? 
            <button onClick={handleSubmit}>Выйти</button>
            :
            // <button onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</button>
            <button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</button>
        }
            
        </div>
    )
});

export default NavBar;
