import React from 'react'
import styles from './main.module.css'
import Menu from '../menu/Menu'

const Main = () => {
    return (
        <div>
            <div className={styles.main}>
                <h1 className={styles.h1}>Департамент контроля качества</h1>
                <Menu />
            </div> 
        </div>
    )
}

export default Main
