import { useState, useEffect} from "react";
import './globalTable.css'


const FormTableTesting = ({ currentId, rowsItem = {}, isVisible, onClose, fetchData }) => {
    const [id, setId] = useState(''); // ID
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

    const getInfoToForm = () => {
            setId(currentId);
            setReglament(rowsItem.reglament || ''); 
            setExecutor(rowsItem.executor || '');
            setAmount(rowsItem.amount || '');
            setTypeWork(rowsItem.typeWork || '');
            setTypeTest(rowsItem.typeTest || '');
            setRecommen(typeof rowsItem.recommen === 'number' ? rowsItem.recommen : rowsItem.recommen || '');
            setErrors(typeof rowsItem.errors === 'number' ? rowsItem.errors : rowsItem.errors || '');
            setCritic(typeof rowsItem.critic === 'number' ? rowsItem.critic : rowsItem.critic || '');
            setCounting(rowsItem.counting || '');
            setIteration(typeof rowsItem.iteration === 'number' ? rowsItem.iteration : rowsItem.iteration || '');
            setPoint(rowsItem.point || '');
            setInspector(rowsItem.inspector || '');
            setDepartament(rowsItem.departament || '');
            setDelayTester(rowsItem.delayTester || '');
            setDelayExecutor(rowsItem.delayExecutor || '');
            setCommentError(rowsItem.commentError || '');
    }

    useEffect(() => {
        setId(currentId);
    }, [currentId]);

    useEffect(() => {
        if (typeTest && typeWork && amount) {
            // КОЭФФИЦЕНТЫ
            const amountMultipliers = {
                '1-2': 1.5,
                '3-5': 4,
                '6 и более': 8,
            };

            // Первая проверка
            const typeMultipliers = {
                'Не типовая': 16,
                'Средняя': 8,
                'Типовая': 4,
            };

            // Итерация 
            const bTypeMultipliers = {
                'Не типовая': 6,
                'Средняя': 4,
                'Типовая': 1,
            };

            if (typeTest === 'Первая' && typeWork in typeMultipliers && amount in amountMultipliers) {
                const basePoints = typeMultipliers[typeWork];
                const multiplier = amountMultipliers[amount];
                setPoint(basePoints * multiplier);
            }

            if (typeTest === 'Итерация' && typeWork in bTypeMultipliers && amount in amountMultipliers) {
                const basePoints = bTypeMultipliers[typeWork];
                const multiplier = amountMultipliers[amount];
                setPoint(basePoints * multiplier);
            }

            if (typeTest === 'Наша ошибка') {
                setPoint(1);
            }
        }
    }, [typeTest, typeWork, amount]);

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

            // const data = await response.json();
            // console.log('Success:', data);
            fetchData();
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="max-w-[1800px] mx-auto my-0">
        <button onClick={getInfoToForm} className="bg-white p-3">Добавить данные с таблицы</button>
        <form className="table__testing" onSubmit={handleSubmit} style={{
            display: isVisible ? 'flex' : 'none',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.3s ease'
        }}>
            <div className="input__wrapp">
                <span>ID</span>
                <input
                    className="id__input bg-white"
                    type="text"
                    placeholder="ID"
                    disabled
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
                    list="КоличествоРабот"
                />
                <datalist id='КоличествоРабот'>
                    <option value="1-2"></option>
                    <option value="3-5"></option>
                    <option value="6 и более"></option>
                </datalist>
            </div>
            <div className="input__wrapp">
                <span>Вид работ</span>
                <input
                    type="text"
                    value={typeWork}
                    onChange={(e) => setTypeWork(e.target.value)}
                    list="ВидРабот"
                />
                <datalist id='ВидРабот'>
                    <option value="Типовая"></option>
                    <option value="Не типовая"></option>
                    <option value="Средняя"></option>
                </datalist>
            </div>
            <div className="input__wrapp">
                <span>Вид проверки</span>
                <input
                    type="text"
                    value={typeTest}
                    onChange={(e) => setTypeTest(e.target.value)}
                    list="ВидПроверки"
                />
                <datalist id='ВидПроверки'>
                    <option value="Первая"></option>
                    <option value="Итерация"></option>
                    <option value="Наша ошибка"></option>
                </datalist>
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
        </div>
    );
};


export default FormTableTesting;