import React, { useContext, useState } from 'react'
import './auth.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userApi';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';


const Auth = observer(() => {
  const {user} = useContext(Context);
  const location = useLocation();
  // const history = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const click = async () => {
    try {
      let data;
      if(isLogin){
        data = await login(email, password);
      }else{
        data = await registration(email, password);
      }
      user.setUser(user)
      user.setIsAuth(true) 
      // history.push(MAIN_ROUTE)
      navigate(MAIN_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
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
          // type="password" 
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
  );
});

export default Auth;