import { useState, useEffect } from "react";
import './globalTable.css'

const FormTableTesting = ({ currentId }) => {
    const [id, setId] = useState(`${currentId}`); // ID
    const [reglament, setReglament] = useState(''); // Регламент
    const [executor, setExecutor] = useState(''); // Исполнитель
    const [amount, setAmount] = useState(''); // Кол-во работ в реге
    const [typeWork, setTypeWork] = useState(''); // Вид работ ( типовая или не типовая)
    const [typeTest, setTypeTest] = useState(''); // Вид проверки ( 1-2 )
    const [recommen, setRecommen] = useState(''); // Рекомендации
    const [errors, setErrors] = useState(''); // Ошибки
    const [critic, setCritic] = useState(''); // Критические ошибки
    const [counting, setCounting] = useState(''); // Отчет
    const [iteration, setIteration] = useState(''); // Итерации
    const [point, setPoint] = useState(''); // Баллы
    const [inspector, setInspector] = useState(''); // Проверяющий
    const [departament, setDepartament] = useState(''); // Отдел
    const [delayTester, setDelayTester] = useState(''); // Просрочка тестировщика
    const [delayExecutor, setDelayExecutor] = useState(''); // Просрочка исполнителя
    const [commentError, setCommentError] = useState(''); // Комментарий ошибки

    // console.log(currentId);
    console.log(id);

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
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <form className="table__testing" onSubmit={handleSubmit} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
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
                    value={errors}
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
    );
}

export default FormTableTesting;