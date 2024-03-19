import React, {useState, useEffect} from 'react'
import './adwork.css'
import { v4 as uuidv4 } from 'uuid';

const AdWork = () => {

    const [reglament, setReglament] = useState('');
    const [executor, setExecutor] = useState('');
    const [amount, setAmount] = useState('1-2');
    const [typeWork, setTypeWork] = useState('Типовая');
    const [typeTest, setTypeTest] = useState('');
    const [recommen, setRecommen] = useState('');
    const [errors, setErrors] = useState('');
    const [critic, setCritic] = useState('');
    const [counting, setCounting] = useState('');
    const [iteration, setIteration] = useState('');
    const [point, setPoint] = useState('');
    const [inspector, setInspector] = useState('');
    const [departament, setDepartament] = useState('');
    const [delayTester, setDelayTester] = useState('');
    const [delayExecutor, setDelayExecutor] = useState('');
    const [commentError, setCommentError] = useState('');
    const [linkReport, setLinkReport] = useState('');
    const [uniqueId, setUniqueId] = useState('');


    // const [reportPeriods, setReportPeriods] = useState([]);

    // const fetchReportPeriods = async () => {
    //     try {
    //       const response = await fetch('/reportPeriods.json'); // Укажите правильный путь к файлу
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    //       const periods = await response.json();
    //       setReportPeriods(periods);
    //     } catch (error) {
    //       console.error("Failed to fetch report periods: ", error);
    //     }
    //   };
    
    //   fetchReportPeriods();

    // useEffect(() => {
    //     // Функция для получения периодов отчетности
    //     const fetchReportPeriods = async () => {
    //       try {
    //         const response = await fetch('/reportPeriods.json'); // Укажите правильный путь к файлу
    //         if (!response.ok) {
    //           throw new Error('Network response was not ok');
    //         }
    //         const periods = await response.json();
    //         setReportPeriods(periods);
    //       } catch (error) {
    //         console.error("Failed to fetch report periods: ", error);
    //       }
    //     };
      
    //     fetchReportPeriods();
    //   }, []);
      
    //   // Функция возвращающая период отчетности для даты
    //   const getReportPeriodForDate = (date) => {
    //     return reportPeriods.find(period => 
    //       new Date(date) >= new Date(period.startDate) &&
    //       new Date(date) <= new Date(period.endDate)
    //     );
    //   };
      
    //   // Пример использования
    //   const someDate = '2024-01-15';
    //   const reportPeriod = getReportPeriodForDate(someDate);
    //   if (reportPeriod) {
    //     console.log(`This date belongs to the reporting period: ${reportPeriod.id}`);
    //   }

    useEffect(() => {
        const randomKey = uuidv4();
        setUniqueId(randomKey)
    })

    useEffect(() => {
        if(typeTest === "Итерация" && typeWork === "Типовая"){
            setPoint('1')
        }
        else if(typeTest === "Итерация" && typeWork === "Не типовая"){
            setPoint('6')
        }
        else if(typeTest === "Итерация" && typeWork === "Средняя"){
            setPoint('4')
        } 
        // ####### //
        else if (typeTest === 'Первая' && typeWork === "Типовая"){
            setPoint('4')
        }
        else if (typeTest === 'Первая' && typeWork === "Не типовая"){
            setPoint('16')
        }
        else if (typeTest === 'Первая' && typeWork === "Средняя"){
            setPoint('8')
        }
    }, [amount, typeTest])

    useEffect(() => {
        
        const noType = 1.5
        const mediumType = 4
        const workType = 8

        const amountArr = {
            amountOne: '1-2',
            amountSecond: '3-5',
            amountThird: '6 и более'
        }

        // if (typeTest === 'Первая' && typeWork === "Не типовая" && amount === "1-2"){
        //     setPoint(16 * noType)
        // } 
        // else if (typeTest === 'Первая' && typeWork === "Средняя" && amount === "3-5"){
        //     setPoint(8 * mediumType)
        // } 
        // else if (typeTest === 'Первая' && typeWork === "Типовая" && amount === "6 и более"){
        //     setPoint(4 * workType)
        // } 

        // 1-2
        if (typeTest === 'Первая' && typeWork === "Не типовая" && amount === "1-2"){
            setPoint(16 * noType)
        } 
        else if (typeTest === 'Первая' && typeWork === "Не типовая" && amount === "3-5"){
            setPoint(16 * noType)
        } 
        else if (typeTest === 'Первая' && typeWork === "Не типовая" && amount === "6 и более"){
            setPoint(16 * noType)
        } 
        // 3-5
        else if (typeTest === 'Первая' && typeWork === "Средняя" && amount === "1-2"){
            setPoint(8 * mediumType)
        } 
        else if (typeTest === 'Первая' && typeWork === "Средняя" && amount === "3-5"){
            setPoint(8 * mediumType)
        } 
        else if (typeTest === 'Первая' && typeWork === "Средняя" && amount === "6 и более"){
            setPoint(8 * mediumType)
        } 
        // 6 и более
        else if (typeTest === 'Первая' && typeWork === "Типовая" && amount === "1-2"){
            setPoint(4 * workType)
        } 
        else if (typeTest === 'Первая' && typeWork === "Типовая" && amount === "3-5"){
            setPoint(4 * workType)
        } 
        else if (typeTest === 'Первая' && typeWork === "Типовая" && amount === "6 и более"){
            setPoint(4 * workType)
        } 

    }, [amount])


    useEffect(() => {
        if(typeTest === "Итерация"){
            setIteration("1")
        }
        if(typeTest === "Первая"){
            setIteration("0")
        }
        if(typeTest === "Наша ошибка"){
            setIteration("0")
        }
    }, [typeTest])

    useEffect(() => {
        if(recommen === ''){
            setRecommen("0")
        }
        if(errors === ''){
            setErrors("0")
        }
        if(critic === ''){
            setCritic("0")
        }
    })

    useEffect(() => {
        const reglamentInput = document.querySelector('.reglament')
        if(reglament.length > 0){
                reglamentInput.style.border = '2px solid transparent'
        }
        if(reglament.length < 1){
                reglamentInput.style.border = ''
        }
        const executorInput = document.querySelector('.executor')
        if(executor.length > 0){
                executorInput.style.border = '2px solid transparent'
        }
        if(executor.length < 1){
                executorInput.style.border = ''
        }
        const typeWorkInput = document.querySelector('.type__work')
        if(typeWork.length > 0){
                typeWorkInput.style.border = '2px solid transparent'
        }
        if(typeWork.length < 1){
                typeWorkInput.style.border = ''
        }
        const amountInput = document.querySelector('.amount')
        if(amount.length > 0){
            amountInput.style.border = '2px solid transparent'
        }
        if(amount.length < 1){
                amountInput.style.border = ''
        }
        const typeTestInput = document.querySelector('.type__test')
        if(typeTest.length > 0){
            typeTestInput.style.border = '2px solid transparent'
        }
        if(typeTest.length < 1){
                typeTestInput.style.border = ''
        }
        const countingInput = document.querySelector('.counting')
        if(counting.length > 0){
            countingInput.style.border = '1px solid #bbb6b6'
        }
        if(counting.length < 1){
                countingInput.style.border = ''
        }
    })


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
        // "pointsRemove": pointsRemove,
        // "dispute": dispute,
        "commentError": commentError,
        "linkReport": linkReport,
        "uniqueId": uniqueId,
    }
    
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
            response.map(executorElem => {
                if(event.target.value === executorElem.executorName){
                    setDepartament(executorElem.executorDepartament)
                }
            })
            setExecutors(response)

        })
        setExecutor(event.target.value);
        // console.log(event.target.value);
        setLinkReport(reglament.substr(0, 51))
    }


    // console.log(executors);
    // console.log(executor);
    

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
                setExecutorList(response)
            })
        })
    }, [])

    // console.log(executorList);
    
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
        // setErrors('');
        // setCritic('');
        // setCounting('');
        // setIteration('');
        // setPoint('');
        // setInspector('');
        // setDepartament('');
        // setDelayTester('');
        // setDelayExecutor('');
        // setCommentError('');
        // setLinkReport('');
    };



    return (
        <div className="ad__container">
            <h1>Доп. Работы</h1>
            <form onSubmit={handleSubmit} className="form__global">
                {/* ################## */}
                <input required value={reglament} onChange={(e) => setReglament(e.target.value)} className="main__input required reglament" type="text" placeholder='Ссылка на регламент'/>
                {/* ################## */}
                <input value={inspector} onChange={(e) => setInspector(e.target.value)} className="main__input" type="text" list='Проверяющий' placeholder='Проверяющий'/>
                <datalist id='Проверяющий'>
                    {executorList && executorList.map((executorElement, id) => {
                        if(executorElement.executorDepartament === 'Тестировщик'){
                            return (
                                <option key={id} value={executorElement.executorName}></option>
                            )
                        }
                    })}
                </datalist>
                {/* ################## */}
                <input required value={executor} onChange={handleChange} className="main__input required executor" type="text" list='Исполнители' placeholder='Исполнители'/>
                <datalist id='Исполнители'>
                    {executorList && executorList.map((executorElement, id) => {
                        return (
                            <option key={id} value={executorElement.executorName}></option>
                        )
                    })}
                </datalist>
                {/* ################## */}
                <input className='type__work' placeholder='Вид работ' required type="text" list='ВидРабот' value={typeWork} onChange={(e) => setTypeWork(e.target.value)}/>
                <datalist id='ВидРабот'>
                    <option value="Типовая"></option>
                    <option value="Не типовая"></option>
                    <option value="Средняя"></option>
                </datalist> 
                {/* ################## */}
                <input className='amount' placeholder='Кол-во работ в рег-те' required type="text" list='КоличествоРабот' value={amount} onChange={(e) => setAmount(e.target.value)}/>
                <datalist id='КоличествоРабот'>
                    <option value="1-2"></option>
                    <option value="3-5"></option>
                    <option value="6 и более"></option>
                </datalist>
                {/* ################## */}
                <input className='type__test' placeholder='Вид проверки' required type="text" list='ВидПроверки' value={typeTest} onChange={(e) => setTypeTest(e.target.value)}/>
                <datalist id='ВидПроверки'>
                    <option value="Первая"></option>
                    <option value="Итерация"></option>
                    <option value="Наша ошибка"></option>
                </datalist>   
                {/* ################## */}
                <div className="point__work">
                    <span className="options__work">Рекомендации</span>
                    <div className="point__wrapp">
                        <input value={recommen} onChange={(e) => setRecommen(e.target.value)} className="main__input point__input" type="text" />
                    </div>
                </div>
                {/* ################## */}
                <div className="point__work">
                    <span className="options__work">Ошибки</span>
                    <div className="point__wrapp">
                        <input value={errors} onChange={(e) => setErrors(e.target.value)} className="main__input point__input" type="text" />
                    </div>
                </div> 
                {/* ################## */}
                <div className="point__work">
                    <span className="options__work">Критические ошибки</span>
                    <div className="point__wrapp">
                        <input value={critic} onChange={(e) => setCritic(e.target.value)} className="main__input point__input" type="text" />
                    </div>
                </div>
                {/* ################## */}
                <div className="counting__wrapp">
                    <span className="options__work">Отчет<span className='red__star'>*</span></span>
                    <textarea className='counting' required type="text" value={counting} onChange={(e) => setCounting(e.target.value)} placeholder="Мой ответ" />
                </div>
                {/* ################## */}
                <input placeholder='Просрочка тестировщика' type="text" list='ПросрочкаТестировщика' value={delayTester} onChange={(e) => setDelayTester(e.target.value)}/>
                <datalist id='ПросрочкаТестировщика'>
                    <option value="Внутренняя"></option>
                    <option value="Внешняя"></option>
                </datalist>
                {/* ################## */}
                <input placeholder='Просрочка исполнителя' type="text" list='ПросрочкаИсполнителя' value={delayExecutor} onChange={(e) => setDelayExecutor(e.target.value)}/>
                <datalist id='ПросрочкаИсполнителя'>
                    <option value="Внутренняя"></option>
                    <option value="Внешняя"></option>
                </datalist>
                {/* ################## */}
                <button type="submit" className="btn__main">Отправить</button>
            </form>
        </div>
    )
}

export default AdWork;