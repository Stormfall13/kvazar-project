import "./App.css";
import Background from "./components/background/Background";
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

  // Функция для изменения фона
  const changeBackground = () => {
    // Задаем новый цвет как состояние
    setBackgroundColor('#112d49'); // Можете заменить на желаемый цвет
  };

  // Используем эффект для применения фона к body
  React.useEffect(() => {
    // Применяем цвет фона к элементу body
    document.body.style.background = backgroundColor;

    // Опционально: возвращаем функцию для сброса фона при демонтировании компонента
    return () => {
      document.body.style.background = ''; // или другой базовый цвет
    };
  }, [backgroundColor]); // Зависимость от состояния backgroundColor

  return (
    <div className='App'>
      <div className="wrapp__app">
        <button className="btn__theme" onClick={changeBackground}>Темная тема</button>
        <MainNav/>
      </div>
        <NavMenu/>
        <Background />
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
