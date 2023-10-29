import React from 'react'
import logoMegagroup from '../../assets/megagroup-logo.svg';
import styles from './logomain.module.css';

const LogoMain = () => {
    return (
        <div className={styles.logo__megagroup}>
            <img src={logoMegagroup} alt="" />
        </div> 
    )
}

export default LogoMain
