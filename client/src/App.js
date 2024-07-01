import "./App.css";
import Main from "./components/main/Main";
import AdWork from "./components/adwork/AdWork";
import NewSite from "./components/newsite/NewSite";
import Listening from "./components/listening/Listening";
import Operator from "./components/operator/Operator";
import TechSupport from "./components/techsupport/TechSupport";
import GlobalTable from "./components/global-table/GlobalTable";
import NotFound from "./components/notFound/NotFound";
import NavMenu from "./components/menu/NavMenu";
import MainNav from "./components/mainNav/MainNav";

import {Routes, Route} from "react-router-dom";
import React, { useState } from "react";




const App = () => {

  // Создаем состояние для хранения цвета фона
  const [backgroundColor, setBackgroundColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [overElementColor, setOverElementColor] = useState('')

  // Функция для изменения фона
  const changeBackground = () => {
    // Задаем новый цвет как состояние
    setBackgroundColor('#001e2b'); // Можете заменить на желаемый цвет
    setTextColor('#e8edeb')
    setOverElementColor('#6beab2')
  };

  // Используем эффект для применения фона к body
  React.useEffect(() => {
    // Применяем цвет фона к элементу body
    document.body.style.background = backgroundColor;
    document.body.style.color = textColor;
    document.querySelectorAll('.btnGrid').forEach(btnGridElement => {
      btnGridElement.style.color = overElementColor;
    })

    // Опционально: возвращаем функцию для сброса фона при демонтировании компонента
    return () => {
      document.body.style.background = ''; // или другой базовый цвет
      document.body.style.color = ''
      document.querySelector('.btnGrid').style.color = ''
    };
  }, [backgroundColor, textColor]); // Зависимость от состояния backgroundColor

  return (
    <div className='App'>
      <div className="wrapp__app">
        <button onClick={changeBackground}>Темная тема</button>
        <MainNav/>
      </div>
        <NavMenu/>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/adwork' element={<AdWork />} />
        <Route path='/newsite' element={<NewSite />} />
        <Route path='/listening' element={<Listening />} />
        <Route path='/operator' element={<Operator />} />
        <Route path='/techsupport' element={<TechSupport />} />
        <Route path='/globalTable' element={<GlobalTable />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

// background: #112d49; Для темного режима

export default App;