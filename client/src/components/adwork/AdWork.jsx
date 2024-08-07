import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth0 } from '@auth0/auth0-react';

import closeImg from '../../assets/close.svg';
import './adwork.css';

const AdWork = () => {
    const { user } = useAuth0();

    // const [reglament, setReglament] = useState('');
    // const [executor, setExecutor] = useState('');
    // const [amount, setAmount] = useState('1-2');
    // const [typeWork, setTypeWork] = useState('Типовая');
    // const [typeTest, setTypeTest] = useState('');
    // const [recommen, setRecommen] = useState('0');
    // const [errors, setErrors] = useState('0');
    // const [critic, setCritic] = useState('0');
    // const [counting, setCounting] = useState('');
    // const [iteration, setIteration] = useState('');
    // const [point, setPoint] = useState('');
    // const [inspector, setInspector] = useState('');
    // const [departament, setDepartament] = useState('');
    // const [delayTester, setDelayTester] = useState('');
    // const [delayExecutor, setDelayExecutor] = useState('');
    // const [commentError, setCommentError] = useState('');
    // const [linkReport, setLinkReport] = useState('');
    // const [uniqueId, setUniqueId] = useState('');
    // const [reportPeriods, setReportPeriods] = useState([]);

    const [reglament, setReglament] = useState(localStorage.getItem('reglament') || '');
    const [executor, setExecutor] = useState(localStorage.getItem('executor') || '');
    const [amount, setAmount] = useState(localStorage.getItem('amount') || '1-2');
    const [typeWork, setTypeWork] = useState(localStorage.getItem('typeWork') || 'Типовая');
    const [typeTest, setTypeTest] = useState(localStorage.getItem('typeTest') || '');
    const [recommen, setRecommen] = useState(localStorage.getItem('recommen') || '0');
    const [errors, setErrors] = useState(localStorage.getItem('errors') || '0');
    const [critic, setCritic] = useState(localStorage.getItem('critic') || '0');
    const [counting, setCounting] = useState(localStorage.getItem('counting') || '');
    const [iteration, setIteration] = useState(localStorage.getItem('iteration') || '');
    const [point, setPoint] = useState(localStorage.getItem('point') || '');
    // const [inspector, setInspector] = useState(localStorage.getItem('inspector') || '');
    const [inspector, setInspector] = useState('');
    const [departament, setDepartament] = useState(localStorage.getItem('departament') || '');
    const [delayTester, setDelayTester] = useState(localStorage.getItem('delayTester') || '');
    const [delayExecutor, setDelayExecutor] = useState(localStorage.getItem('delayExecutor') || '');
    const [commentError, setCommentError] = useState(localStorage.getItem('commentError') || '');
    const [linkReport, setLinkReport] = useState(localStorage.getItem('linkReport') || '');
    const [uniqueId, setUniqueId] = useState('');
    const [reportPeriods, setReportPeriods] = useState('');

    useEffect(() => {
        try {
            setInspector(user.name);
        } catch (error) {
            console.log(error);
        }
    }, [user]);

 
    useEffect(() => {
        const dataPeriods = [
            {
                "id": "1",
                "startDate": "29.12.2023",
                "endDate": "28.01.2024"
            },
            {
                "id": "2",
                "startDate": "29.01.2024",
                "endDate": "27.02.2024"
            },
            {
                "id": "3",
                "startDate": "28.02.2024",
                "endDate": "27.03.2024"
            },
            {
                "id": "4",
                "startDate": "28.03.2024",
                "endDate": "25.04.2024",
            },
            {
                "id": "5",
                "startDate": "26.04.2024",
                "endDate": "29.05.2024",
            },
            {
                "id": "6",
                "startDate": "30.05.2024",
                "endDate": "26.06.2024",
            },
            {
                "id": "7",
                "startDate": "27.06.2024",
                "endDate": "29.07.2024",
            },
            {
                "id": "8",
                "startDate": "30.07.2024",
                "endDate": "28.08.2024",
            },
            {
                "id": "9",
                "startDate": "29.08.2024",
                "endDate": "26.09.2024",
            },
            {
                "id": "10",
                "startDate": "27.09.2024",
                "endDate": "29.10.2024",
            },
            {
                "id": "11",
                "startDate": "30.10.2024",
                "endDate": "27.11.2024",
            },
            {
                "id": "12",
                "startDate": "28.11.2024",
                "endDate": "29.12.2024",
            }
        ];

        const now = new Date();
    
        const currentDay = String(now.getDate()).padStart(2, '0');
        const currentMonth = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const currentYear = now.getFullYear();
        
        const formattedToday = `${currentDay}.${currentMonth}.${currentYear}`;
        
        dataPeriods.forEach(period => {
            const [startDay, startMonth, startYear] = period.startDate.split('.');
            const startDate = new Date(`${startYear}-${startMonth}-${startDay}`);
            
            const [endDay, endMonth, endYear] = period.endDate.split('.');
            const endDate = new Date(`${endYear}-${endMonth}-${endDay}`);
    
            const today = new Date(`${currentYear}-${currentMonth}-${currentDay}`);
            
            if (today >= startDate && today <= endDate) {
                setReportPeriods(`${currentYear}-${endMonth}-01`);
            }
        });
        
    }, []);


    useEffect(() => {
        const randomKey = uuidv4();
        setUniqueId(randomKey);
    }, []);

    useEffect(() => {
        const amountMultipliers = {
            '1-2': 1.5,
            '3-5': 4,
            '6 и более': 8,
        };

        const typeMultipliers = {
            'Не типовая': 16,
            'Средняя': 8,
            'Типовая': 4,
        };

        if (typeTest === 'Первая' && typeWork in typeMultipliers && amount in amountMultipliers) {
            const basePoints = typeMultipliers[typeWork];
            const multiplier = amountMultipliers[amount];
            setPoint(basePoints * multiplier);
        }

        const bTypeMultipliers = {
            'Не типовая': 6,
            'Средняя': 4,
            'Типовая': 1,
        };

        if (typeTest === 'Итерация' && typeWork in bTypeMultipliers && amount in amountMultipliers) {
            const basePoints = bTypeMultipliers[typeWork];
            const multiplier = amountMultipliers[amount];
            setPoint(basePoints * multiplier);
        }

        if (typeTest === 'Наша ошибка') {
            setPoint(1);
        }
    }, [typeTest, typeWork, amount, setPoint]);

    useEffect(() => {
        if (typeTest === "Итерация") {
            setIteration("1");
        }
        if (typeTest === "Первая") {
            setIteration("0");
        }
        if (typeTest === "Наша ошибка") {
            setIteration("0");
        }
    }, [typeTest]);

    useEffect(() => {
        const btnClear = document.querySelector('.btn__clear');
        if (executor.length > 1) {
            btnClear.style.display = 'inline-block';
        } else {
            btnClear.style.background = '';
        }
        const reglamentInput = document.querySelector('.reglament');
        if (reglament.length > 0) {
            reglamentInput.style.border = '1px solid #bbb6b6';
        } else {
            reglamentInput.style.border = '';
        }
        const executorInput = document.querySelector('.executor');
        if (executor.length > 0) {
            executorInput.style.border = '1px solid #bbb6b6';
        } else {
            executorInput.style.border = '';
        }
        const typeWorkInput = document.querySelector('.type__work');
        if (typeWork.length > 0) {
            typeWorkInput.style.border = '1px solid #bbb6b6';
        } else {
            typeWorkInput.style.border = '';
        }
        const amountInput = document.querySelector('.amount');
        if (amount.length > 0) {
            amountInput.style.border = '1px solid #bbb6b6';
        } else {
            amountInput.style.border = '';
        }
        const typeTestInput = document.querySelector('.type__test');
        if (typeTest.length > 0) {
            typeTestInput.style.border = '1px solid #bbb6b6';
        } else {
            typeTestInput.style.border = '';
        }

        localStorage.setItem('reglament', reglament);
        localStorage.setItem('executor', executor);
        localStorage.setItem('amount', amount);
        localStorage.setItem('typeWork', typeWork);
        localStorage.setItem('typeTest', typeTest);
        localStorage.setItem('recommen', recommen);
        localStorage.setItem('errors', errors);
        localStorage.setItem('critic', critic);
        localStorage.setItem('counting', counting);
        localStorage.setItem('iteration', iteration);
        localStorage.setItem('point', point);
        localStorage.setItem('inspector', inspector);
        localStorage.setItem('departament', departament);
        localStorage.setItem('delayTester', delayTester);
        localStorage.setItem('delayExecutor', delayExecutor);
        localStorage.setItem('commentError', commentError);
        localStorage.setItem('linkReport', linkReport);

    });

    const [executors, setExecutors] = useState([]);

    function handleChange(event) {
        fetch('http://localhost:5000/api/executor', {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(response => {
                response.forEach(executorElem => {
                    if (event.target.value === executorElem.executorName) {
                        setDepartament(executorElem.executorDepartament);
                    }
                });
                setExecutors(response);
            });
        setExecutor(event.target.value);
        setLinkReport(reglament.substr(0, 51));
    }

    const [executorList, setExecutorList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/executor', {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(response => {
                setTimeout(() => {
                    setExecutorList(response);
                });
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const item = {
            "reglament": reglament,
            "executor": executor,
            "amount": amount,
            "typeWork": typeWork,
            "typeTest": typeTest,
            "recommen": recommen,
            "errors": errors,
            "critic": critic,
            "counting": counting,
            "iteration": iteration,
            "point": point,
            "inspector": inspector,
            "departament": departament,
            "delayTester": delayTester,
            "delayExecutor": delayExecutor,
            "commentError": commentError,
            "linkReport": linkReport,
            "uniqueId": uniqueId,
            "reportPeriods": reportPeriods,
        };

        fetch('http://localhost:5000/api/dop-work', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });

            localStorage.removeItem('reglament');
            localStorage.removeItem('executor');
            localStorage.removeItem('amount');
            localStorage.removeItem('typeWork');
            localStorage.removeItem('typeTest');
            localStorage.removeItem('recommen');
            localStorage.removeItem('errors');
            localStorage.removeItem('critic');
            localStorage.removeItem('counting');
            localStorage.removeItem('iteration');
            localStorage.removeItem('point');
            localStorage.removeItem('departament');
            localStorage.removeItem('delayTester');
            localStorage.removeItem('delayExecutor');
            localStorage.removeItem('commentError');
            localStorage.removeItem('linkReport');
            localStorage.removeItem('reportPeriods');

            window.location.reload()
    };

    function clearExecutor() {
        setExecutor('');
        const btnClear = document.querySelector('.btn__clear');
        btnClear.style.display = '';
        localStorage.removeItem('executor');
    }

    function clearForm() {

        localStorage.removeItem('reglament');
        localStorage.removeItem('executor');
        localStorage.removeItem('amount');
        localStorage.removeItem('typeWork');
        localStorage.removeItem('typeTest');
        localStorage.removeItem('recommen');
        localStorage.removeItem('errors');
        localStorage.removeItem('critic');
        localStorage.removeItem('counting');
        localStorage.removeItem('iteration');
        localStorage.removeItem('point');
        localStorage.removeItem('departament');
        localStorage.removeItem('delayTester');
        localStorage.removeItem('delayExecutor');
        localStorage.removeItem('commentError');
        localStorage.removeItem('linkReport');
        localStorage.removeItem('reportPeriods');

        window.location.reload()
    }

    return (
        <div className="ad__container">
            <h1>Доп. Работы</h1>
            <button className='clear__form' onClick={clearForm}>Очистить форму</button>
            <form onSubmit={handleSubmit} className="form__global">
                <div className="point__work">
                    <span className='options__work'>Ссылка на регламент</span>
                    <input required value={reglament} onChange={(e) => setReglament(e.target.value)} className="reglament" type="text" />
                </div>
                <div className="point__work">
                    <span className='options__work'>Проверяющий</span>
                    <input disabled value={inspector} onChange={(e) => setInspector(e.target.value)} className="main__input" type="text" list='Проверяющий' />
                </div>
                <div className="point__work">
                    <span className="options__work">Исполнители</span>
                    <span className="btn__clear" onClick={clearExecutor}>
                        <img src={closeImg} alt="" />
                    </span>
                    <input required value={executor} onChange={handleChange} className='executor' type="text" list='Исполнители' />
                    <datalist id='Исполнители'>
                        {executorList && executorList.map((executorElement, id) => {
                            return (
                                <option key={id} value={executorElement.executorName}></option>
                            );
                        })}
                    </datalist>
                </div>
                <div className="point__work">
                    <span className="options__work">Вид работ</span>
                    <input className='type__work' required type="text" list='ВидРабот' value={typeWork} onChange={(e) => setTypeWork(e.target.value)} />
                    <datalist id='ВидРабот'>
                        <option value="Типовая"></option>
                        <option value="Не типовая"></option>
                        <option value="Средняя"></option>
                    </datalist>
                </div>
                <div className="point__work">
                    <span className="options__work">Кол-во работ в рег-те</span>
                    <input className='amount' required type="text" list='КоличествоРабот' value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <datalist id='КоличествоРабот'>
                        <option value="1-2"></option>
                        <option value="3-5"></option>
                        <option value="6 и более"></option>
                    </datalist>
                </div>
                <div className="point__work">
                    <span className="options__work">Вид проверки</span>
                    <input className='type__test' required type="text" list='ВидПроверки' value={typeTest} onChange={(e) => setTypeTest(e.target.value)} />
                    <datalist id='ВидПроверки'>
                        <option value="Первая"></option>
                        <option value="Итерация"></option>
                        <option value="Наша ошибка"></option>
                    </datalist>
                </div>
                <div className="point__work">
                    <span className="options__work">Рекомендации</span>
                    <div className="point__wrapp">
                        <input value={recommen} onChange={(e) => setRecommen(e.target.value)} className="main__input point__input" type="text" />
                    </div>
                </div>
                <div className="point__work">
                    <span className="options__work">Ошибки</span>
                    <div className="point__wrapp">
                        <input value={errors} onChange={(e) => setErrors(e.target.value)} className="main__input point__input" type="text" />
                    </div>
                </div>
                <div className="point__work">
                    <span className="options__work">Критические ошибки</span>
                    <div className="point__wrapp">
                        <input value={critic} onChange={(e) => setCritic(e.target.value)} className="main__input point__input" type="text" />
                    </div>
                </div>
                <div className="counting__wrapp">
                    <span className="options__work">Отчет<span className='red__star'>*</span></span>
                    <textarea className='counting' required type="text" value={counting} onChange={(e) => setCounting(e.target.value)} />
                </div>
                <div className="point__work">
                    <span className="options__work">Просрочка исполнителя</span>
                    <input className='main__input' type="text" list='ПросрочкаИсполнителя' value={delayExecutor} onChange={(e) => setDelayExecutor(e.target.value)} />
                    <datalist id='ПросрочкаИсполнителя'>
                        <option value="Внутренняя"></option>
                        <option value="Внешняя"></option>
                        <option value="Ответственный"></option>
                    </datalist>
                </div>
                <div className="point__work">
                    <span className="options__work">Просрочка тестировщика</span>
                    <input className='main__input' type="text" list='ПросрочкаТестировщика' value={delayTester} onChange={(e) => setDelayTester(e.target.value)} />
                    <datalist id='ПросрочкаТестировщика'>
                        <option value="Внутренняя"></option>
                        <option value="Внешняя"></option>
                    </datalist>
                </div>
                <button type="submit" className="btn__main">Отправить</button>
            </form>
        </div>
    );
}

export default AdWork;