import React from 'react'
import styles from './menu.module.css'
import NavMenu from './NavMenu'

const Menu = () => {
    return (
        <div className={styles.wrapp__menu}>
            <NavMenu/>
        </div>
        
    )
}

export default Menu;
