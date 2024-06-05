import { useState, useEffect } from "react";
import './globalTable.css'
import GlobalTable from "./GlobalTable";

const FormTableTesting = ({ currentId, rowsItem, isVisible, onClose, fetchData }) => {
    const [id, setId] = useState(''); // ID
    const [reglament, setReglament] = useState(rowsItem.reglament); // Регламент
    const [executor, setExecutor] = useState(rowsItem.executor); // Исполнитель
    const [amount, setAmount] = useState(rowsItem.amount); // Кол-во работ в реге
    const [typeWork, setTypeWork] = useState(rowsItem.typeWork); // Вид работ ( типовая или не типовая)
    const [typeTest, setTypeTest] = useState(rowsItem.typeTest); // Вид проверки ( 1-2 )
    const [recommen, setRecommen] = useState(rowsItem.recommen); // Рекомендации
    const [errors, setErrors] = useState(rowsItem.errors); // Ошибки
    const [critic, setCritic] = useState(rowsItem.critic); // Критические ошибки
    const [counting, setCounting] = useState(rowsItem.counting); // Отчет
    const [iteration, setIteration] = useState(rowsItem.iteration); // Итерации
    const [point, setPoint] = useState(rowsItem.point); // Баллы
    const [inspector, setInspector] = useState(rowsItem.inspector); // Проверяющий
    const [departament, setDepartament] = useState(rowsItem.departament); // Отдел
    const [delayTester, setDelayTester] = useState(rowsItem.delayTester); // Просрочка тестировщика
    const [delayExecutor, setDelayExecutor] = useState(rowsItem.delayExecutor); // Просрочка исполнителя
    const [commentError, setCommentError] = useState(rowsItem.commentError); // Комментарий ошибки

    // setReglament()
    // setExecutor()
    // setAmount()
    // setTypeWork()
    // setTypeTest()
    // setRecommen()
    // setErrors()
    // setCritic()
    // setCounting()
    // setIteration()
    // setPoint()
    // setInspector()
    // setDepartament()
    // setDelayTester()
    // setDelayExecutor()
    // setCommentError()

    // const dataFunctions = () => {
    //     setReglament
    //     setExecutor
    //     setAmount
    //     setTypeWork
    //     setTypeTest
    //     setRecommen
    //     setErrors
    //     setCritic
    //     setCounting
    //     setIteration
    //     setPoint
    //     setInspector
    //     setDepartament
    //     setDelayTester
    //     setDelayExecutor
    //     setCommentError
    // }
    // console.log(dataFunctions);

    useEffect(() => {
        setId(currentId)
    })
    // console.log(currentId);
    // console.log(id);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const item = {
            reglament,
            executor,
            amount,
            typeWork,
            typeTest,
            recommen,
            errors,
            critic,
            counting,
            iteration,
            point,
            inspector,
            departament,
            delayTester,
            delayExecutor,
            // pointsRemove,
            // dispute,
            commentError,
        }

        console.log("Submitting data: ", item);

        try {
            const response = await fetch(`http://localhost:5000/api/dop-work/${id}`, { // замените URL на ваш реальный
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // console.log('Success:', data);
            fetchData();
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <>
        <form className="table__testing" onSubmit={handleSubmit} style={{
            display: isVisible ? 'flex' : 'none',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.3s ease'
        }}>
            <div className="input__wrapp">
                <span>ID</span>
                <input 
                    className="id__input"
                    type="text" 
                    placeholder="ID" 
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                /> 
            </div>
            <div className="input__wrapp">
                <span>Ссылка на регламент</span>
                <input 
                    type="text" 
                    value={reglament}
                    onChange={(e) => setReglament(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Исполнитель</span>
                <input 
                    type="text" 
                    value={executor}
                    onChange={(e) => setExecutor(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Кол-во работ в реге</span>
                <input 
                    type="text" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Вид работ</span>
                <input 
                    type="text" 
                    value={typeWork}
                    onChange={(e) => setTypeWork(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Вид проверки</span>
                <input 
                    type="text" 
                    value={typeTest}
                    onChange={(e) => setTypeTest(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Рекомендации</span>
                <input 
                    type="text" 
                    value={recommen}
                    onChange={(e) => setRecommen(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Ошибки</span>
                <input 
                    type="text" 
                    value={errors}
                    onChange={(e) => setErrors(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Критические ошибки</span>
                <input 
                    type="text" 
                    value={critic}
                    onChange={(e) => setCritic(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Итерации</span>
                <input 
                    type="text" 
                    value={iteration}
                    onChange={(e) => setIteration(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Баллы</span>
                <input 
                    type="text" 
                    value={point}
                    onChange={(e) => setPoint(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Проверяющий</span>
                <input 
                    type="text" 
                    value={inspector}
                    onChange={(e) => setInspector(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Отдел</span>
                <input 
                    type="text" 
                    value={departament}
                    onChange={(e) => setDepartament(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Просрочка тестировщика</span>
                <input 
                    type="text" 
                    value={delayTester}
                    onChange={(e) => setDelayTester(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Просрочка исполнителя</span>
                <input 
                    type="text" 
                    value={delayExecutor}
                    onChange={(e) => setDelayExecutor(e.target.value)}
                />
            </div>
            <div className="input__wrapp">
                <span>Комментарий ошибки</span>
                <input 
                    type="text" 
                    value={commentError}
                    onChange={(e) => setCommentError(e.target.value)}
                />
            </div>
            <div className="input__wrapp textarea__wrapp">
                <span>Отчет</span>
                <textarea 
                    type="text" 
                    value={counting}
                    onChange={(e) => setCounting(e.target.value)}
                />
            </div>
            <button type="submit">Изменить</button>
        </form>
        {/* <GlobalTable dataFunctions={dataFunctions}/> */}
        </>
    );
}

export default FormTableTesting;