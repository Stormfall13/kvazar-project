import React, { useEffect, useState } from 'react'
import styles from './globalTable.module.css'

const GlobalTable = () => {

    const [dopWorks, setDopWorks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/dop-work', {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
        .then(res => res.json())
        .then(response => {
            setTimeout(() => {
                setDopWorks(response)
            })
        })
    }, [])

    console.log(dopWorks)

    return (
        <div>
            <h1>Глобальная таблица</h1>
            <div className={styles.m__container}>
                {dopWorks && dopWorks.map(dopWork => {
                    return(
                        <div key={dopWork.id} className={styles.wrapper__container}>
                            <p>ID {dopWork.id}</p>
                            <p>Кол-во доп работ в реге {dopWork.amount}</p>
                            <p>Комментарий ошибки {dopWork.commentError}</p> 
                            <p>Отчет: {dopWork.counting}</p>
                            <span>Ссылка на регламент <a href={dopWork.reglament} target='_blank'>{dopWork.reglament}</a></span>
                            <p>Дата {(new Date(dopWork.date)).toLocaleDateString()}</p>
                        </div>
                    )
                })} 
            </div> 
        </div>
    )
}

export default GlobalTable
