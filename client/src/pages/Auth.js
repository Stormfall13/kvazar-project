import React, { useState } from 'react'
import './auth.css';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userApi';

const Auth = () => {

  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const click = async () => {
    if(isLogin){
      const response = await login();
    }else{
      const response = await registration(email, password);
      console.log(response);
    }
    
  }

  return (
    <div>
      <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
      <form className='auth'>
        <input 
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text" 
          placeholder='Введите ваш email...'/>
        <input 
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password" 
          placeholder='Введите ваш пароль...'/>
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
          <button onClick={click}>{isLogin ? 'Войти' : 'Регистрация'}</button>
        </div>
      </form>
    </div>
  )
}

export default Auth;
