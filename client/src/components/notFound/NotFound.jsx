import React, { useState } from 'react'
import styles from './notFound.module.css';
import { Link } from 'react-router-dom';


const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.nf}>Страница не найдена. Давай назад!</h1>
            <div className={styles.bm}>
            </div>
            <Link to="/" className={styles.link__nf}>&#129044; Вернуться на главную</Link>
        </div>
    )
}

export default NotFound
