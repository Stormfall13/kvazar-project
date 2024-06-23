import { Link } from 'react-router-dom'
import styles from './menu.module.css'

const NavMenu = () => {


  return (
    <nav className={styles.nav}>
        <Link to="/" className='font-sans font-medium text-2xl p-1 m-3'>Главная</Link>
        <Link to="adwork" className='font-sans font-medium text-2xl p-1 m-3'>Доп. Работы</Link>
        <Link to="newsite" className='font-sans font-medium text-2xl p-1 m-3'>Новые сайты</Link>
        <Link to="listening" className='font-sans font-medium text-2xl p-1 m-3'>Прослушка Тех.П</Link>
        <Link to="operator" className='font-sans font-medium text-2xl p-1 m-3'>Операторы</Link>
        <Link to="techsupport" className='font-sans font-medium text-2xl p-1 m-3'>Тех.П</Link>
        <Link to="globalTable" className='font-sans font-medium text-2xl p-1 m-3'>Данные по отчетам</Link>
    </nav>
  )
}

export default NavMenu
