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
                <div className="title__table">
                    <p>ID</p>
                    <p>Дата</p>
                    <p>Ссылка на регламент</p>
                    <p>Проверяющий</p>
                    <p>Исполнитель</p>
                    <p>Кол-во доп работ в рег-те</p>
                    <p>Вид работ</p>
                    <p>Вид проверки</p>
                    <p>Рекомендации</p>
                    <p>Ошибки</p>
                    <p>Крит-е ошибки</p>
                    <p>Отчет</p>
                    <p>Итерация</p>
                    <p>Снятые баллы</p>
                    <p>Спор</p>
                    <p>Коммент ошибки</p>
                    <p>Сроки</p>
                    <p>Просрочка тестировщика</p>
                    <p>Баллы</p>
                    <p>Просрочка исполнителя</p>
                    <p>Департамент</p>
                    <p>Ссылка для отчета</p>
                </div>
                {dopWorks && dopWorks.map(dopWork => {
                    return(
                        <div key={dopWork.id} className="wrapper__container">
                            <ul>
                                <li>{dopWork.id}</li>
                                <li>{(new Date(dopWork.date)).toLocaleDateString()}</li>
                                <li><a className='link__reglament' href={dopWork.reglament} target='_blank'>{dopWork.reglament}</a></li>
                                <li>{dopWork.inspector}</li>
                                <li>{dopWork.executor}</li>
                                <li>{dopWork.amount}</li>
                                <li>{dopWork.typeWork}</li>
                                <li>{dopWork.typeTest}</li>
                                <li>{dopWork.recommen}</li>
                                <li>{dopWork.errors}</li>
                                <li>{dopWork.critic}</li>
                                <li>{dopWork.counting}</li>
                                <li>{dopWork.iteration}</li>
                                <li>{dopWork.pointsRemove}</li>
                                <li>{dopWork.dispute}</li>
                                <li>{dopWork.commentError}</li>
                                <li>{dopWork.deadlines}</li>
                                <li>{dopWork.delayTester}</li>
                                <li>{dopWork.point}</li>
                                <li>{dopWork.delayExecutor}</li>
                                <li>{dopWork.departament}</li>
                                <li><a href={dopWork.linkReport} target='_blank'>{dopWork.linkReport}</a></li>
                            </ul> 
                        </div>
                    )
                })} 
                </div>
            </div> 
        </div>
    )
}

export default GlobalTable
