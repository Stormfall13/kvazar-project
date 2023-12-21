import './App.css';
import Background from './components/background/Background';
import Main from './components/main/Main';
import NotFound from './components/notFound/NotFound';
import AdWork from './components/adwork/AdWork'
import NewSite from './components/newsite/NewSite'
import Listening from './components/listening/Listening'
import Operator from './components/operator/Operator'
import TechSupport from './components/techsupport/TechSupport'
import GlobalTable from './components/global-table/GlobalTable';
import AppRouter from './components/AppRouter';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';



function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div style={{fontSize: '40px'}}>Здесь будет переключатель темы</div>
        <AppRouter/>
        <Background />
        <NavBar/>
        <Routes>
          {/* <Route path='admin' element={<AppRouter/>}/> */}
          <Route path='/' element={<Main />} />
          <Route path='adwork' element={<AdWork />} />
          <Route path='newsite' element={<NewSite />} />
          <Route path='listening' element={<Listening />} />
          <Route path='operator' element={<Operator />} />
          <Route path='techsupport' element={<TechSupport />} />
          <Route path='globalTable' element={<GlobalTable />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// background: #112d49; Для темного режима

export default App;
