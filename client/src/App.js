import "./App.css";
import Background from "./components/background/Background";
import Main from "./components/main/Main";
import AdWork from "./components/adwork/AdWork";
import NewSite from "./components/newsite/NewSite";
import Listening from "./components/listening/Listening";
import Operator from "./components/operator/Operator";
import TechSupport from "./components/techsupport/TechSupport";
import GlobalTable from "./components/global-table/GlobalTable";
import AppRouter from "./components/AppRouter";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import React, { useEffect, useState, useContext } from "react";
import { check } from "./http/userApi";
import Menu from "./components/menu/Menu";
import Auth from "./pages/Auth";
import MainPage from "./pages/MainPage";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  // Создаем состояние для хранения цвета фона
  const [backgroundColor, setBackgroundColor] = useState("");

  // Функция для изменения фона
  const changeBackground = () => {
    // Задаем новый цвет как состояние
    setBackgroundColor("#112d49"); // Можете заменить на желаемый цвет
  };

  // Используем эффект для применения фона к body
  useEffect(() => {
    // Применяем цвет фона к элементу body
    document.body.style.background = backgroundColor;

    // Опционально: возвращаем функцию для сброса фона при демонтировании компонента
    return () => {
      document.body.style.background = ""; // или другой базовый цвет
    };
  }, [backgroundColor]); // Зависимость от состояния backgroundColor

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(true);
        user.setIsAuth(true);
        // console.log(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return "Загрузка";
  }

  return (
    <BrowserRouter>
      <div className="App">
        <button onClick={changeBackground}>Темная тема</button>
        <Link to="/" >Главная</Link>
        <NavBar />
        <AppRouter />
        <Background />
        <Routes>
          <Route path="/login" element={<Auth/>} />
          <Route path="/registration" element={<Auth/>} />
          <Route path="/adwork" element={<AdWork/>} />
          <Route path="/" element={<MainPage/>} />
          {/* <Route path='admin' element={<AppRouter/>}/> */}
          {/* <Route path="/" element={<Main />} />
          <Route path="/adwork" element={<AdWork />} />
          <Route path="/newsite" element={<NewSite />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/operator" element={<Operator />} />
          <Route path="/techsupport" element={<TechSupport />} />
          <Route path="/globalTable" element={<GlobalTable />} /> */}
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
});

// background: #112d49; Для темного режима

export default App;



// const App = () => {

//   // Создаем состояние для хранения цвета фона
//   const [backgroundColor, setBackgroundColor] = useState('');

//   // Функция для изменения фона
//   const changeBackground = () => {
//     // Задаем новый цвет как состояние
//     setBackgroundColor('#112d49'); // Можете заменить на желаемый цвет
//   };

//   // Используем эффект для применения фона к body
//   React.useEffect(() => {
//     // Применяем цвет фона к элементу body
//     document.body.style.background = backgroundColor;

//     // Опционально: возвращаем функцию для сброса фона при демонтировании компонента
//     return () => {
//       document.body.style.background = ''; // или другой базовый цвет
//     };
//   }, [backgroundColor]); // Зависимость от состояния backgroundColor

//   return (
//     <BrowserRouter>
//       <div className='App'>
//         <button onClick={changeBackground}>Темная тема</button>
//         <Background />
//         <Routes>
//           {/* <Route path='admin' element={<AppRouter/>}/> */}
//           <Route path='/' element={<Main />} />
//           <Route path='/adwork' element={<AdWork />} />
//           <Route path='/newsite' element={<NewSite />} />
//           <Route path='/listening' element={<Listening />} />
//           <Route path='/operator' element={<Operator />} />
//           <Route path='/techsupport' element={<TechSupport />} />
//           <Route path='/globalTable' element={<GlobalTable />} />
//           {/* <Route path='*' element={<NotFound />} /> */}
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// // background: #112d49; Для темного режима

// export default App;
