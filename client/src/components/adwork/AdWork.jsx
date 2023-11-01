import React, {useState, useEffect} from 'react'
import './adwork.css'

const AdWork = () => {

    const [reglament, setReglament] = useState('');
    const [executor, setExecutor] = useState('');
    const [amount, setAmount] = useState('');
    const [typeWork, setTypeWork] = useState('');
    const [typeTest, setTypeTest] = useState('');
    const [recommen, setRecommen] = useState('');
    const [err, setErr] = useState('');
    const [critic, setCritic] = useState('');
    const [counting, setCounting] = useState('');
    const [iteration, setIteration] = useState('');
    const [deadlines, setDeadlines] = useState('');
    const [point, setPoint] = useState('');
    const [inspector, setInspector] = useState('');
    const [departament, setDepartament] = useState('');
    const [delayTester, setDelayTester] = useState('');
    const [delayExecutor, setDelayExecutor] = useState('');
    const [pointsRemove, setPointsRemove] = useState('');
    const [dispute, setDispute] = useState('');
    const [commentError, setCommentError] = useState('');
    const [dataNum, setDataNum] = useState('');
    const [linkReport, setLinkReport] = useState('');
    const [reportMonth, setReportMonth] = useState('');

    const [executors, setExecutors] = useState([]);

    useEffect(() => {
        if(amount === '1-2'){
            setPoint('4')
        }
        else if(amount === '3-5'){
            setPoint('16')
        }
        else if(amount === '6 и более'){
            setPoint('8')
        }
    }, [amount]);

    useEffect(() => {
        if(typeTest === 'Итерация'){
            setIteration("1")
        }
    }, [typeTest])

    const item = {
        "reglament": reglament,
        "executor": executor,
        "amount": amount,
        "typeWork": typeWork,
        "typeTest": typeTest,
        "recommen": recommen,
        "err": err,
        "critic": critic,
        "counting": counting,
        "iteration": iteration,
        "deadlines": deadlines,
        "point": point,
        "inspector": inspector,
        "departament": departament,
        "delayTester": delayTester,
        "delayExecutor": delayExecutor,
        "pointsRemove": pointsRemove,
        "dispute": dispute,
        "commentError": commentError,
        // "linkReport": linkReport,
    }

    // console.log(departament);

    function handleChange(event) {
        fetch('http://localhost:5000/api/executor', {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
        .then(res => res.json())
        .then(response => {
            response.map(executorElem => {
                if(event.target.value == executorElem.executorName){
                    setDepartament(executorElem.executorDepartament)
                }
            })
            setExecutors(response)

        })
        setExecutor(event.target.value);
        // console.log(event.target.value);
    }


    console.log(executors);
    console.log(executor);
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        // Отправка данных на сервер
        fetch('http://localhost:5000/api/dop-work', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
            })
            .then((response) => response.json())
            .then((data) => {
            // Обработка ответа от сервера
            console.log(data);
            })
            .catch((error) => {
            // Обработка ошибки
            console.error(error);
        });

        // Очистка полей формы
        // setReglament('');
        // setExecutor('');
        // setAmount('');
        // setTypeWork('');
        // setTypeTest('');
        // setRecommen('');
        // setErr('');
        // setCritic('');
        // setCounting('');
        // setIteration('');
        // setDeadlines('');
        // setPoint('');
        // setInspector('');
        // setDepartament('');
        // setDelayTester('');
        // setDelayExecutor('');
        // setPointsRemove('');
        // setDispute('');
        // setCommentError('');
        // setDataNum('');
        // setLinkReport('');
        // setReportMonth('');

    };



    return (
        <div className="ad__container">
            <h1>Доп. Работы</h1>
            <form onSubmit={handleSubmit} className="form__global">
                <input value={reglament} onChange={(e) => setReglament(e.target.value)} className="main__input" type="text" placeholder='Ссылка на регламент'/>
                <input value={inspector} onChange={(e) => setInspector(e.target.value)} className="main__input" type="text" list='Проверяющий' placeholder='Проверяющий'/>
                <datalist id='Проверяющий'>
                    <option value="Садыков Р"></option>
                    <option value="Орлова Д"></option>
                    <option value="Дильгер Э"></option>
                    <option value="Хакимов Ш"></option>
                </datalist>
                <input value={executor} onChange={handleChange} className="main__input" type="text" list='Исполнители' placeholder='Исполнители'/>
                <datalist id='Исполнители'>
                    <option value="Пяк Александр"></option>
                    <option value="Ким Константин"></option>
                    <option value="Бодров Александр"></option>
                    <option value="Харламов Александр"></option>
                    <option value="Семенеев Денис"></option>
                </datalist>
                <div className="wrapp__checkbox">
                    <span className="options__work">Вид работ</span>
                    <input type="text" list='ВидРабот' value={typeWork} onChange={(e) => setTypeWork(e.target.value)}/>
                    <datalist id='ВидРабот'>
                        <option value="Типовая"></option>
                        <option value="Не типовая"></option>
                        <option value="Средняя"></option>
                    </datalist> 
                </div>
                <div className="quanty__work">
                    <span className="options__work">Кол-во работ в рег-те</span>
                    <input type="text" list='КоличествоРабот' value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <datalist id='КоличествоРабот'>
                        <option value="1-2"></option>
                        <option value="3-5"></option>
                        <option value="6 и более"></option>
                    </datalist> 
                </div>
                <div className="view__work">
                    <span className="options__work">Вид проверки</span>
                    <input type="text" list='ВидПроверки' value={typeTest} onChange={(e) => setTypeTest(e.target.value)}/>
                    <datalist id='ВидПроверки'>
                        <option value="Первая"></option>
                        <option value="Итерация"></option>
                        <option value="Наша ошибка"></option>
                    </datalist>   
                </div>
                <div className="recommen__work">
                    <span className="options__work">Рекомендации</span>
                    <input type="number" list='Рекомендации' value={recommen} onChange={(e) => setRecommen(e.target.value)}/>
                    <datalist id='Рекомендации'>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </datalist>   
                    <div className="point__wrapp">
                        <input value={recommen} onChange={(e) => setRecommen(e.target.value)} className="main__input" type="number" placeholder='Другое'/>
                    </div>
                </div>
                <div className="err__work">
                    <span className="options__work">Ошибки</span>
                    <input type="number" list='Ошибки' value={err} onChange={(e) => setErr(e.target.value)} />
                    <datalist id='Ошибки'>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </datalist>   
                    <div className="point__wrapp">
                        <input value={err} onChange={(e) => setErr(e.target.value)} className="main__input" type="number" placeholder='Другое'/>
                    </div>
                </div> 
                <div className="critic__work">
                    <span className="options__work">Критические ошибки</span>
                    <input type="number" list='КритическиеОшибки' value={critic} onChange={(e) => setCritic(e.target.value)} />
                    <datalist id='КритическиеОшибки'>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </datalist>    
                    <div className="point__wrapp">
                        <input value={critic} onChange={(e) => setCritic(e.target.value)} className="main__input" type="text" placeholder='Другое'/>
                    </div>
                </div>
                <div className="counting__wrapp">
                    <span className="options__work">Отчет*</span>
                    <textarea value={counting} onChange={(e) => setCounting(e.target.value)} placeholder="Мой ответ" ></textarea>
                </div>
                <div className="view__work">
                    <span className="options__work">Сроки</span>
                    <input type="text" list='Сроки' value={deadlines} onChange={(e) => setDeadlines(e.target.value)}/>
                    <datalist id='Сроки'>
                        <option value="Внутренний"></option>
                        <option value="Внешний"></option>
                        <option value="Ответственный"></option>
                    </datalist> 
                </div> 
                <div className="view__work">
                    <span className="options__work">Просрочка тестировщика</span>
                    <input type="text" list='ПросрочкаТестировщика' value={delayTester} onChange={(e) => setDelayTester(e.target.value)}/>
                    <datalist id='ПросрочкаТестировщика'>
                        <option value="Внутренняя"></option>
                        <option value="Внешняя"></option>
                    </datalist>
                </div> 
                <div className="view__work">
                    <span className="options__work">Просрочка исполнителя</span>
                    <input type="text" list='ПросрочкаИсполнителя' value={delayExecutor} onChange={(e) => setDelayExecutor(e.target.value)}/>
                    <datalist id='ПросрочкаИсполнителя'>
                        <option value="Внутренняя"></option>
                        <option value="Внешняя"></option>
                    </datalist>
                </div> 
                <button type="submit" className="btn__main">Отправить</button>
            </form>
        </div>
    )
}

export default AdWork;

