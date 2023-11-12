import React, { useEffect, useState } from 'react'
import './globalTable.css'

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

    // console.log(dopWorks)

    return (
        <div className='main__table'>
            <h1>Глобальная таблица</h1>
            <h2 className="title__second">Отчет по доп работам</h2>
            <div className="m__container">
                <div className="wrapp__table">
                {dopWorks && dopWorks.map(dopWork => {
                    return(
                        <div key={dopWork.id} className="wrapper__container">
                            <p>ID <span>{dopWork.id}</span></p>
                            <p>{(new Date(dopWork.date)).toLocaleDateString()}</p>
                            <p className='link__reg'>Ссылка на регламент: <a className='link__reglament' href={dopWork.reglament} target='_blank'>{dopWork.reglament}</a></p>
                            <p>Проверяющий: <span>{dopWork.inspector}</span></p>
                            <p>Исполнитель: <span>{dopWork.executor}</span></p>
                            <p>Кол-во доп работ в реге: <span>{dopWork.amount}</span></p>
                            <p>Вид работ: <span>{dopWork.typeWork}</span></p>
                            <p>Вид проверки: <span>{dopWork.typeTest}</span></p>
                            <p>Рекомендации: <span>{dopWork.recommen}</span></p>
                            <p>Ошибки: <span>{dopWork.errors}</span></p>
                            <p>Крит-е ошибки: <span>{dopWork.critic}</span></p>
                            <p>Отчет: <span>{dopWork.counting}</span></p>
                            <p>Итерация: <span>{dopWork.iteration}</span></p>
                            <p>Снятые баллы: <span>{dopWork.pointsRemove}</span></p>
                            <p>Спор: <span>{dopWork.dispute}</span></p>
                            <p>Коммент ошибки: <span>{dopWork.commentError}</span></p>
                            <p>Сроки: <span>{dopWork.deadlines}</span></p>
                            <p>Просрочка тестировщика: <span>{dopWork.delayTester}</span></p>
                            <p>Баллы: <span>{dopWork.point}</span></p>
                            <p>Просрочка исполнителя: <span>{dopWork.delayExecutor}</span></p>
                            <p>Департамент: <span>{dopWork.departament}</span></p>
                            <p>Ссылка для отчета <a href={dopWork.linkReport} target='_blank'>{dopWork.linkReport}</a></p>
                        </div>
                    )
                })} 
                </div>
            </div> 
        </div>
    )
}

export default GlobalTable
