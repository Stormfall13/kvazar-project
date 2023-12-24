import React from 'react'
import './auth.css';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = () => {

  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE


  return (
    <div>
      <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
      <form className='auth'>
        <input type="text" placeholder='Введите ваш email...'/>
        <input type="text" placeholder='Введите ваш пароль...'/>
        <div className="btn__wrapp">
          {
            isLogin ? 
              <div className="register__wrapp">
                Нет аккаунта ? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
              </div>
              :
              <div>
                Есть аккаунт ? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
              </div>
          }
          <button>{isLogin ? 'Войти' : 'Регистрация'}</button>
        </div>
      </form>
    </div>
  )
}

export default Auth;
