import { Link } from 'react-router-dom'
import './menu.css'

const NavMenu = () => {


  return (
    <nav className='main__menu'>
        <Link to="/" className='main__link'>Главная</Link>
        <Link to="adwork" className='main__link'>Доп. Работы</Link>
        <Link to="newsite" className='main__link'>Новые сайты</Link>
        <Link to="listening" className='main__link'>Прослушка Тех.П</Link>
        <Link to="operator" className='main__link'>Операторы</Link>
        <Link to="techsupport" className='main__link'>Тех.П</Link>
        <Link to="globalTable" className='main__link'>Данные по отчетам</Link>
    </nav>
  )
}

export default NavMenu
