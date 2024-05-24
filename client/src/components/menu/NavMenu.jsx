import { Link } from 'react-router-dom'
import styles from './menu.module.css'

const NavMenu = () => {
  return (
    <nav className={styles.nav}>
        <Link to="/" className={styles.main__l}>Главная</Link>
        <Link to="adwork" className={styles.main__l}>Доп. Работы</Link>
        <Link to="newsite" className={styles.main__l}>Новые сайты</Link>
        <Link to="listening" className={styles.main__l}>Прослушка Тех.П</Link>
        <Link to="operator" className={styles.main__l}>Операторы</Link>
        <Link to="techsupport" className={styles.main__l}>Тех.П</Link>
        <Link to="globalTable" className={styles.main__l}>Данные по отчетам</Link>
    </nav>
  )
}

export default NavMenu
